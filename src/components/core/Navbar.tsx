import useUserStore from "@/stores/userStore";
import DarkMode from "@mui/icons-material/DarkMode";
import { Avatar, Box, Typography } from "@mui/joy";
import Switch from "@mui/joy/Switch";
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
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Chat", path: "/about" },
    { name: "Setting", path: "/contact" },
  ];
  const { user } = useUserStore();

  return (
    <Box padding={3} borderBottom="2px solid black" ref={ref}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <Image width="110" height="80" src="/logo.png" alt="App Logo Image" />
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
              Naoufal BTD
            </Typography>
            <Avatar
              src="https://media.licdn.com/dms/image/D4E03AQGkSyFlaX9XlA/profile-displayphoto-shrink_800_800/0/1674326691712?e=1683763200&v=beta&t=yc5vJQ0m14RC69zocEd4gWQb0D-3aABRglHcHDGPKi8"
              // onClick={handleClick}
              // size="lg"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
