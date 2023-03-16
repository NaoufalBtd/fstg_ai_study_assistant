import useChatRoomStore from "@/stores/messagesStore";
import { Box } from "@mui/joy";
import React from "react";
import CustomAccordion from "../core/Accordion";

interface SavedMessageWidgetProps {}

const SavedMessageWidget: React.FC<SavedMessageWidgetProps> = () => {
  const {chatMessages} = useChatRoomStore();
  const savedMessages = chatMessages.filter((message) => message.isSaved);
  return (
    <Box>
      <CustomAccordion
        title="Favorite Message"
        content="hola"
        messages={savedMessages}
      />
    </Box>
  );
};

export default SavedMessageWidget;
