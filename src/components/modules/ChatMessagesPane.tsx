import { Box, useTheme } from "@mui/joy";
import moment from "moment";
import React from "react";
import useChatRoomStore from "../../stores/messagesStore";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ChatMessagesProps {}
interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
}

const ChatMessagesPane: React.FC<ChatMessagesProps> = () => {
  const { chatMessages } = useChatRoomStore();
  // const messages: Message[] = [
  //   {
  //     id: '1',
  //     text: 'Hi there, how are you?',
  //     sender: 'user',
  //     timestamp: new Date(),
  //   },
  //   {
  //     id: '2',
  //     text: "I'm good, thanks for asking!",
  //     sender: 'BOT',
  //     timestamp: new Date(),
  //   },
  //   {
  //     id: '3',
  //     text: 'What can I help you with today?',
  //     sender: 'BOT',
  //     timestamp: new Date(),
  //   },
  //   {
  //     id: '4',
  //     text: "I'm having trouble with my account",
  //     sender: 'user',
  //     timestamp: new Date(),
  //   },
  //   {
  //     id: '5',
  //     text: "Sure thing, let's take a look",
  //     sender: 'BOT',
  //     timestamp: new Date(),
  //   },
  //   {
  //     id: '6',
  //     text: 'Can you tell me your account number?',
  //     sender: 'BOT',
  //     timestamp: new Date(),
  //   },
  //   {
  //     id: '7',
  //     text: "It's 1234567890",
  //     sender: 'user',
  //     timestamp: new Date(),
  //   },
  //   {
  //     id: '8',
  //     text: 'Thanks! Let me check your account',
  //     sender: 'BOT',
  //     timestamp: new Date(),
  //   },
  //   {
  //     id: '9',
  //     text: "I'm sorry, but it looks like your account is currently locked",
  //     sender: 'BOT',
  //     timestamp: new Date(),
  //   },
  //   {
  //     id: '10',
  //     text: 'What can I do to unlock it?',
  //     sender: 'user',
  //     timestamp: new Date(),
  //   },
  //   {
  //     id: '11',
  //     text: "You'll need to contact our support team to get it unlocked",
  //     sender: 'BOT',
  //     timestamp: new Date(),
  //   },
  //   {
  //     id: '12',
  //     text: 'Okay, thanks for your help',
  //     sender: 'user',
  //     timestamp: new Date(),
  //   },
  //   {
  //     id: '13',
  //     text: 'No problem, happy to help!',
  //     sender: 'BOT',
  //     timestamp: new Date(),
  //   },
  //   {
  //     id: '14',
  //     text: 'Is there anything else I can help you with?',
  //     sender: 'BOT',
  //     timestamp: new Date(),
  //   },
  //   {
  //     id: '15',
  //     text: "No, that's all for now",
  //     sender: 'user',
  //     timestamp: new Date(),
  //   },
  // ];

  const theme = useTheme();
  return (
    <Box
      sx={{
        height: "100vh",
        background: "#111b21",
        paddingBottom: "25%",
      }}>
      <Box>
        {chatMessages.map((message) => {
          const { id, content, sender, createdAt } = message;
          return (
            <Box
              key={id}
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
                  flexDirection: "column",
                  alignItems: sender === "BOT" ? "flex-start" : "flex-end",
                  justifyContent: "flex-start",
                  padding: 2,
                  borderRadius: 5,
                  backgroundColor:
                    sender === "BOT" ? "background.level2" : "info.plainColor",
                }}>
                <Box sx={{ color: "white", fontSize: 12 }}>{content}</Box>
                <Box sx={{ color: "white", fontSize: 10 }}>
                  {moment(createdAt).toLocaleString()}
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default ChatMessagesPane;
