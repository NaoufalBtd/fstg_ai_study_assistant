import { Avatar, Container, Menu, MenuItem, Typography } from '@mui/joy';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface homeHeaderProps {}

const homeHeader: React.FC<homeHeaderProps> = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
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
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Avatar
        alt="Remy Sharp"
        src="https://media.licdn.com/dms/image/D4E03AQGkSyFlaX9XlA/profile-displayphoto-shrink_800_800/0/1674326691712?e=1683763200&v=beta&t=yc5vJQ0m14RC69zocEd4gWQb0D-3aABRglHcHDGPKi8"
        onClick={handleClick}
        size="lg"
        sx={{ cursor: 'pointer', mr: 2, border: '1px solid #fff' }}
      />
      <Typography level="h5">Welcome Back, Naoufal Boutadarhart</Typography>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        aria-labelledby="basic-demo-button"
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </Container>
  );
};

export default homeHeader;
