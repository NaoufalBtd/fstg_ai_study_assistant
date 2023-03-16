import { Box, Typography } from '@mui/joy';
import React from 'react';

interface NavItemProps {
  title: string;
  path: string;
}

const NavItem: React.FC<NavItemProps> = ({ title, path }) => {
  const isActive = false;
  return (
    <Box
      sx={{
        ':hover': { cursor: 'pointer', borderTop: '2px solid gray' },
        paddingInline: 3,
        ...(isActive ? { borderTop: '2px solid primary.700' } : {}),
      }}
    >
      <Typography sx={isActive ? { color: 'primary.700' } : {}} level="body1">
        {title}
      </Typography>
    </Box>
  );
};

export default NavItem;
