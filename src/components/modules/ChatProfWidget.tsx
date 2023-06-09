import { Avatar, Box, Button, Stack, Typography } from "@mui/joy";
import React from "react";

interface ChatProfWidgnetProps {}

const ChatProfWidget: React.FC<ChatProfWidgetProps> = () => {
  //todo: get teachers and bot name from the backend
  const teachers = [
    {
      name: "Pr.Khadija",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      name: "Pr.Youness",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
  ];
  return (
    <Box sx={{ p: 3, background: "#5852d6", borderRadius: 20 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Avatar
          sx={{ marginRight: 2, ml: 3 }}
          src="https://media.istockphoto.com/id/1250000899/vector/chat-bot-robot-avatar-in-circle-round-shape-isolated-on-white-background-stock-vector.jpg?s=612x612&w=0&k=20&c=xj8GkmfFYH_Frho_pJ0HL2dkDwbZAI0Of6KwKdVsh1s="
        />
        <Typography level="body1">FSTG Bot</Typography>
      </Box>
      <Typography level="body1" mb={2}>
        Teached By:{" "}
      </Typography>
      <Stack spacing={1} mb={2}>
        {teachers.map((teacher) => (
          <Box
            key={teacher.name}
            sx={{ display: "flex", alignItems: "center" }}>
            <Avatar sx={{ marginRight: 2, ml: 3 }} src={teacher.avatar} />
            <Typography level="body1">{teacher.name}</Typography>
          </Box>
        ))}
      </Stack>
      <Button sx={{ margin: "auto", display: "block" }} variant="solid">
        View All The Books I Read
      </Button>
    </Box>
  );
};

export default ChatProfWidget;
