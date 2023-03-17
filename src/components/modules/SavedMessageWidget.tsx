import useChatRoomStore from "@/stores/messagesStore";
import React from "react";
import CustomAccordion from "../core/Accordion";

interface SavedMessageWidgetProps {}

const SavedMessageWidget: React.FC<SavedMessageWidgetProps> = () => {
  const { chatMessages } = useChatRoomStore();
  const savedMessages = chatMessages.filter((message) => message.isSaved);
  return <CustomAccordion title="Favorite Message" messages={savedMessages} />;
};

export default SavedMessageWidget;
