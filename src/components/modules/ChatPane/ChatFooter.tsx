import useChatRoomStore from "@/stores/messagesStore";
import SendIcon from "@mui/icons-material/SendRounded";
import { Box, CircularProgress, IconButton, Input } from "@mui/joy";
import { Message } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

interface ChatFooterProps {}

const ChatFooter: React.FC<ChatFooterProps> = () => {
  const [message, setMessage] = useState<string>("");
  const [disabled, setDisabled] = useState(false);
  const { addChatMessage, courseModule, chatId, selectChat } =
    useChatRoomStore();
  const { data: session } = useSession();

  const handleMessageSubmit = async () => {
    setDisabled(true);
    setMessage("");

    try {
      if (!courseModule) throw new Error("No course module selected");
      if (!session?.user.id) throw new Error("No user logged in");

      const response = await axios.post<{
        payload: { userMsg: Message; botMsg: Message };
      }>("http://localhost:3000/api/message/new", {
        content: message,
        chatId,
        userId: session?.user.id,
        moduleId: courseModule.id,
      });
      if (!response.data.payload.userMsg)
        throw new Error("No user message returned");
      if (!response.data.payload.botMsg)
        throw new Error("No bot message returned");
      if (!chatId) selectChat(response.data.payload.userMsg.chatId, []);
      addChatMessage({
        id: response.data.payload.userMsg.id,
        content: response.data.payload.userMsg.content,
        sender: "USER",
        isSaved: false,
        createdAt: response.data.payload.userMsg.createdAt,
      });
      addChatMessage({
        id: response.data.payload.botMsg.id,
        content: response.data.payload.botMsg.content,
        sender: "BOT",
        isSaved: false,
        createdAt: response.data.payload.botMsg.createdAt,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          zIndex: 2,
          bottom: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}>
        <Input
          sx={{ width: "75%" }}
          value={message}
          onChange={(evt) => setMessage(evt.target.value)}
          onKeyDown={(evt) => {
            evt.key === "Enter" && handleMessageSubmit();
          }}
          endDecorator={
            disabled ? (
              <CircularProgress
                size="sm"
                sx={{ bgcolor: "background.surface" }}
              />
            ) : (
              <IconButton
                onClick={handleMessageSubmit}
                sx={{ borderRadius: 10, ":hover": { color: "inherit" } }}>
                <SendIcon sx={{ color: "inherit" }} />
              </IconButton>
            )
          }
          disabled={disabled}
        />
      </Box>
      <Box
        sx={{
          position: "absolute",
          zIndex: 1,
          bottom: 0,
          left: 0,
          marginBlock: "inherit",
          height: "20%",
          width: "100%",
          paddingInline: "inherit",
        }}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            backgroundImage:
              "linear-gradient(180deg,rgba(53,55,64,0),#353740 58.85%)",
          }}
        />
      </Box>
    </>
  );
};

export default ChatFooter;
