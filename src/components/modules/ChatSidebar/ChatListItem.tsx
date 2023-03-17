import useChatRoomStore from "@/stores/messagesStore";
import { Message } from "@/types";
import ChatOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  ListItem,
  ListItemButton,
  ListItemDecorator,
  Typography,
} from "@mui/joy";
import axios from "axios";
import { useState } from "react";

interface ChatItemProps {
  id: string;
  title: string;
  lastSentDate?: string;
}

const ChatListItem: React.FC<ChatItemProps> = ({ id, title, lastSentDate }) => {
  //todo: handle the delete and edit buttons
  const [isHover, setIsHover] = useState(false);
  const { setChatMessages, chatId, selectChat } = useChatRoomStore();
  const isActiveChat = chatId === id;

  const handleChatSelection = async () => {
    console.log("clicked");
    try {
      const chat = await axios.get<{ payload: { messages: Message[] } }>(
        `/api/messages/${id}`,
        {
          withCredentials: true,
        }
      );

      selectChat(id, chat.data.payload.messages);
    } catch (err) {}
  };

  return (
    <ListItem
      sx={{ mx: 2, borderRadius: 10, mb: 2 }}
      endAction={
        isHover && (
          <Box sx={{ alignItems: "center", display: "flex" }}>
            <EditIcon
              sx={{ mr: 1, cursor: "pointer", color: "primary.softColor" }}
            />
            <DeleteIcon
              sx={{ cursor: "pointer", color: "primary.softColor" }}
            />
          </Box>
        )
      }>
      <ListItemButton
        variant={isActiveChat ? "soft" : "plain"}
        selected={isActiveChat}
        onClick={handleChatSelection}
        sx={{ borderRadius: 10 }}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}>
        <ListItemDecorator>
          <ChatOutlineIcon color="neutral.plainColor" />
        </ListItemDecorator>
        <Box
          sx={{
            justifyContent: "space-between",
            width: "100%",
            display: "flex",
          }}>
          <Typography width={"80%"} color="primary.softColor" noWrap>
            Untitled chat
          </Typography>
          {/* {!isHover && (
            <Typography sx={{ color: "white", fontSize: "xs" }}>
              13 Dec
            </Typography>
          )} */}
        </Box>
      </ListItemButton>
    </ListItem>
  );
};

export default ChatListItem;
