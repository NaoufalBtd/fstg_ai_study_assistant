import useChatRoomStore from "@/stores/messagesStore";
import { Message } from "@/types";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Box } from "@mui/joy";
import axios from "axios";
import moment from "moment";
import React, { useState } from "react";

interface ChatMessagesProps {}

const ChatMessagesPane: React.FC<ChatMessagesProps> = () => {
  const { chatMessages, toggleMessageFavorite } = useChatRoomStore();
  const [hoveredMessageId, setHoveredMessageId] = useState<
    Message["id"] | null
  >(null);

  const toggleFavorite = (id: Message["id"]) => {
    toggleMessageFavorite(id);
    axios.post("/api/messages/favorite", {
      id,
      isSaved: !chatMessages.find((message) => message.id === id)?.isSaved,
    });
  };
  return (
    <Box
      sx={{
        height: "100%",
        minHeight: "100vh",
        background: "#111b21",
        paddingBottom: "25%",
      }}>
      <Box>
        {chatMessages.map((message) => {
          const { id, content, sender, createdAt } = message;
          return (
            <Box
              key={id}
              onMouseEnter={() => setHoveredMessageId(message.id)}
              onMouseLeave={() => setHoveredMessageId(null)}
              sx={{
                display: "flex",
                flexDirection: sender === "BOT" ? "row" : "row-reverse",
                alignItems: "center",
                justifyContent: "flex-start",
                padding: 2,
              }}>
              <Box
                sx={{
                  display: "flex",
                  maxWidth: { md: "70%" },
                  flexDirection: "column",
                  alignItems: sender === "BOT" ? "flex-start" : "flex-end",
                  justifyContent: "flex-start",
                  padding: 2,
                  borderRadius: 5,
                  backgroundColor:
                    sender === "BOT" ? "background.level2" : "info.plainColor",
                }}>
                <Box sx={{ color: "white", fontSize: 13 }}>{content}</Box>
                <Box sx={{ color: "white", fontSize: 10 }}>
                  {moment(createdAt).toLocaleString()}
                </Box>
              </Box>
              {hoveredMessageId === message.id && (
                <Box
                  sx={{ cursor: "pointer", mx: 3 }}
                  onClick={() => toggleFavorite(message.id)}>
                  {message.isSaved ? (
                    <Favorite
                      sx={{ color: "focusVisible" }}
                      className="animate__animated animate__bounceIn"
                    />
                  ) : (
                    <FavoriteBorder />
                  )}
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default ChatMessagesPane;
