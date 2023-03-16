import { Add } from "@mui/icons-material";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  Typography,
} from "@mui/joy";

import { useState } from "react";
import useChatDrawer from "../../../hooks/useChatDrawer";
import useChatRoomStore from "../../../stores/messagesStore";
import PolyfillDrawer from "../../core/Drawer";
import ChatListItem from "./ChatListItem";

const ChatSidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { drawerVariant, drawerWidth, drawerOpen } = useChatDrawer();
  const { courseModule, chats, selectChat } = useChatRoomStore();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleAddingChat = () => {
    selectChat("", []);
  };
  const drawer = (
    <div>
      <Divider />
      <List sx={{ width: drawerWidth }}>
        {chats.map((chat, index) => (
          <ChatListItem title={chat.title} id={chat.id} key={chat.id} />
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={(theme) => ({
          [theme.breakpoints.up("md")]: {
            width: drawerWidth,
            flexShrink: 0,
            backgroundColor: "#202123",
          },
        })}>
        <PolyfillDrawer variant={drawerVariant} open={drawerOpen}>
          {/* <IconButton
            aria-label="open drawer"
            edge="start"
            color="primary"
            className="menu-icon"
            onClick={handleDrawerToggle}
            sx={(theme) => ({
              marginRight: theme.spacing(2),
              [theme.breakpoints.up('md')]: {
                display: 'none',
              },
            })}
          >
            <MenuBook />
          </IconButton> */}
          <Box width="100%">
            <Typography
              level="body1"
              textAlign="center"
              sx={{
                color: "white",
                padding: 2,
                textAlign: "center",
                width: "100%",
                display: "block",
              }}>
              Module: {courseModule?.name}
            </Typography>
            {/* <Input
              placeholder="Search"
              endDecorator={<SearchIcon />}
              sx={{ width: '80%', margin: '0 auto 1.2rem auto' }}
            /> */}
          </Box>
          <Divider />
          {drawer}
          <List>
            <ListItem>
              <ListItemButton onClick={handleAddingChat}>
                <ListItemDecorator>
                  <Add />
                </ListItemDecorator>
                <ListItemContent>Add New Chat</ListItemContent>
              </ListItemButton>
            </ListItem>
          </List>
        </PolyfillDrawer>
      </Box>
    </Box>
  );
};

export default ChatSidebar;
