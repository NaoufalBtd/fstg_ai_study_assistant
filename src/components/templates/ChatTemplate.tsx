import useUiStore from "@/stores/uiStore";
import { Box, Grid } from "@mui/joy";
import React from "react";
import "simplebar-react/dist/simplebar.min.css";
import useChatDrawer from "../../hooks/useChatDrawer";
import AppNavbar from "../modules/AppNavbar";
import ChatPane from "../modules/ChatPane";
import ChatProfWidget from "../modules/ChatProfWidget";
import ChatSidebar from "../modules/ChatSidebar";
import SavedMessageWidget from "../modules/SavedMessageWidget";

interface ChatProps {}

const ChatTemplate: React.FC<ChatProps> = () => {
  const { drawerOpen, drawerWidth } = useChatDrawer();
  const { navbarHeight } = useUiStore();
  return (
    <Box
      sx={{
        position: "relative",
        bgcolor: "background.level1",
        overflow: "hidden",
      }}>
      <AppNavbar />
      <ChatSidebar />
      <Grid
        container
        spacing={3}
        sx={{
          position: "relative",
          height: `calc(100vh - ${navbarHeight}px)`,
          margin: 0,
          ...(drawerOpen
            ? {
                width: `calc(100vw - ${drawerWidth}px)`,
                marginLeft: `${drawerWidth}px`,
              }
            : { width: "100%" }),
        }}>
        <Grid
          xs={12}
          md={8}
          sx={{
            height: "100%",
            position: "relative",
            borderRadius: "10px 10px 0 0 ",
          }}>
          <ChatPane />
        </Grid>
        <Grid xs={12} md={4}>
          <ChatProfWidget />
          <SavedMessageWidget />
          {/* <Box height={'100%'} width="100%" bgcolor="bisque" /> */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatTemplate;
