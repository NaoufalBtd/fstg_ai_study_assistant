import useUiStore from "@/stores/uiStore";
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
import axios from "axios";
import { useSession } from "next-auth/react";

import { useState } from "react";
import useChatDrawer from "../../../hooks/useChatDrawer";
import useChatRoomStore from "../../../stores/messagesStore";
import PolyfillDrawer from "../../core/Drawer";
import ChatListItem from "./ChatListItem";
import ListItemSkeleton from "./listItemSkeleton";

//todo: add a scrollable list of chats

const ChatSidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { drawerVariant, drawerWidth, drawerOpen } = useChatDrawer();
  const { data: session } = useSession();
  const { courseModule, chats, selectChat, addChat } = useChatRoomStore();
  const { isAddingChat, setIsAddingChat } = useUiStore();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleAddingChat = async () => {
    if (session?.user?.id === undefined) throw new Error("User not logged in");
    if (courseModule?.id === undefined)
      throw new Error("No course module found");

    setIsAddingChat(true);
    const newChat = await axios.post("/api/chats/new", {
      userId: session?.user.id,
      moduleId: courseModule?.id,
      title: "Untitled Chat",
    });

    addChat(newChat.data.payload);
    selectChat(newChat.data.payload.id, []);

    setIsAddingChat(false);
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
          {isAddingChat ? <ListItemSkeleton /> : drawer}
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
