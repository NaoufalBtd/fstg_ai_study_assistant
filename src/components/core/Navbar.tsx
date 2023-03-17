import DarkMode from "@mui/icons-material/DarkMode";
import { Avatar, Box, Typography } from "@mui/joy";
import Switch from "@mui/joy/Switch";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import NavItem from "./NavItem";

interface NavbarProps {
  refForward?: React.ForwardedRef<HTMLDivElement>;
}

const Navbar: React.FC<NavbarProps> = React.forwardRef<
  HTMLDivElement,
  NavbarProps
>((props, ref) => {
  const { data: session } = useSession();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Chat", path: "/about" },
    { name: "Setting", path: "/contact" },
  ];

  return (
    <Box padding={3} borderBottom="2px solid black" ref={ref}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <Image width="60" height="35" src="/logo.png" alt="App Logo Image" />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {navLinks.map((link) => {
            const { name, path } = link;
            return <NavItem key="name" title={name} path={path} />;
          })}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Switch
            checked
            onChange={() => console.log("switched")}
            slotProps={{
              input: { "aria-label": "Dark mode" },
              thumb: {
                children: <DarkMode />,
              },
            }}
            sx={{
              "--Switch-thumbSize": "28px",
              mr: 4,
            }}
          />
          {/* User Avatar */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography level="body1" sx={{ mr: 2 }}>
              {session?.user?.name}
            </Typography>
            <Avatar src="https://i.pravatar.cc/150?img=3" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
