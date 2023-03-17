import useChatRoomStore from "@/stores/messagesStore";
import DeleteForever from "@mui/icons-material/DeleteForever";
import Edit from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import {
  Avatar,
  Box,
  IconButton,
  Input,
  ListDivider,
  ListItemDecorator,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/joy";
import { useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import ChatDeleteModal from "../modals/ChatDelete";
import ChatRenameModal from "../modals/ChatRename";

interface ChatHeaderProps {}

interface ChatHeaderMenu {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  open: boolean;
  handleRenameChatOpen: () => void;
  handleDeleteChatOpen: () => void;
}

const ChatMenu: React.FC<ChatHeaderMenu> = ({
  anchorEl,
  handleClose,
  open,
  handleRenameChatOpen,
  handleDeleteChatOpen,
}) => {
  //todo: implement menu functionalities
  return (
    <Menu
      id="positioned-demo-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      aria-labelledby="positioned-demo-button"
      placement="bottom-end">
      <MenuItem onClick={handleRenameChatOpen}>
        <ListItemDecorator>
          <Edit />
        </ListItemDecorator>{" "}
        Edit Chat Title
      </MenuItem>
      <MenuItem disabled onClick={handleClose}>
        <ListItemDecorator />
        Draft Chat
      </MenuItem>
      <ListDivider />
      <MenuItem onClick={handleDeleteChatOpen} variant="soft" color="danger">
        <ListItemDecorator sx={{ color: "inherit" }}>
          <DeleteForever />
        </ListItemDecorator>{" "}
        Delete
      </MenuItem>
    </Menu>
  );
};

const ChatHeader: React.FC<ChatHeaderProps> = () => {
  //todo: implement search functionality
  const theme = useTheme();
  const { chatId, chats } = useChatRoomStore();
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [renameModalOpen, setRenameModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleRenameChatOpen = () => {
    setRenameModalOpen(true);
    handleMenuClose();
  };
  const handleDeleteChatOpen = () => {
    setDeleteModalOpen(true);
    handleMenuClose();
  };

  return (
    <Box sx={{ width: "100%", height: 80, borderRadius: "inherit" }}>
      {isMobile ? (
        <Box
          sx={{
            height: 200,
            backgroundColor: theme.palette.primary,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <Typography level="body1">
            {chatId
              ? chats.find((c) => c.id === chatId)?.title
              : "Start New Conversation"}
          </Typography>
          <Box>
            <SearchIcon />
            <MoreVertIcon />
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            height: 80,
            backgroundColor: "background.body",
            borderRadius: "inherit",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              sx={{ marginRight: 2, ml: 3 }}
              src="https://media.istockphoto.com/id/1250000899/vector/chat-bot-robot-avatar-in-circle-round-shape-isolated-on-white-background-stock-vector.jpg?s=612x612&w=0&k=20&c=xj8GkmfFYH_Frho_pJ0HL2dkDwbZAI0Of6KwKdVsh1s="
            />
            <Typography level="body1">
              {" "}
              {chatId
                ? chats.find((c) => c.id === chatId)?.title || "Untitled Chat"
                : "Untitled Chat"}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Input
              variant="soft"
              endDecorator={<SearchIcon sx={{ mr: 2 }} />}
            />
            <IconButton variant="plain" onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
          </Box>
        </Box>
      )}
      <ChatMenu
        open={menuOpen}
        handleClose={handleMenuClose}
        anchorEl={anchorEl}
        handleRenameChatOpen={handleRenameChatOpen}
        handleDeleteChatOpen={handleDeleteChatOpen}
      />
      <ChatRenameModal open={renameModalOpen} setOpen={setRenameModalOpen} />
      <ChatDeleteModal open={deleteModalOpen} setOpen={setDeleteModalOpen} />
    </Box>
  );
};

export default ChatHeader;
