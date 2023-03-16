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
  const [isHover, setIsHover] = useState(false);
  const { setChatMessages, chatId, selectChat } = useChatRoomStore();
  const isActiveChat = chatId === id;

  const handleChatSelection = async () => {
    console.log("clicked");
    try {
      const chat = await axios.get<{ payload: { messages: Message[] } }>(
        `/api/message/${id}`,
        {
          withCredentials: true,
        }
      );

      selectChat(id, chat.data.payload.messages);
    } catch (err) {}
  };

  return (
    <ListItem
      endAction={
        isHover && (
          <Box sx={{ alignItems: "center", display: "flex" }}>
            <EditIcon sx={{ mr: 1, cursor: "pointer" }} />
            <DeleteIcon sx={{ cursor: "pointer" }} />
          </Box>
        )
      }>
      <ListItemButton
        selected={isActiveChat}
        onClick={handleChatSelection}
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
          <Typography level="body1" sx={{ color: "white" }}>
            Untitled chat
          </Typography>
          {!isHover && (
            <Typography sx={{ color: "white", fontSize: "xs" }}>
              13 Dec
            </Typography>
          )}
        </Box>
      </ListItemButton>
    </ListItem>
  );
};

export default ChatListItem;
