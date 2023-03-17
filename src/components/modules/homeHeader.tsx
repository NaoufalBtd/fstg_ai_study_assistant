import { Avatar, Container, Menu, MenuItem, Typography } from "@mui/joy";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface homeHeaderProps {}

const homeHeader: React.FC<homeHeaderProps> = () => {
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Container
      sx={{
        pt: 5,
        display: "flex",
        alignItems: "center",
      }}>
      <Avatar
        alt="Remy Sharp"
        src="https://i.pravatar.cc/150?img=5"
        onClick={handleClick}
        size="lg"
        sx={{ cursor: "pointer", mr: 2, border: "1px solid #fff" }}
      />
      <Typography level="h5">Welcome Back, {session?.user?.name}</Typography>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        aria-labelledby="basic-demo-button">
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </Container>
  );
};

export default homeHeader;
