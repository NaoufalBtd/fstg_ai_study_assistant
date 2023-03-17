import React from "react";
import SimpleBar from "simplebar-react";
import ChatMessagesPane from "./ChatBody";
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";

interface ChatPaneProps {}

const ChatPane: React.FC<ChatPaneProps> = () => {
  return (
    <>
      <ChatHeader />
      <SimpleBar
        style={{
          // minHeight: `calc(100vh - ${navbarHeight}px)`,
          height: "100%",
          position: "relative",
        }}>
        <ChatMessagesPane />
      </SimpleBar>

      <ChatFooter />
    </>
  );
};

export default ChatPane;
