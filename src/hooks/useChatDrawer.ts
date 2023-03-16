import { useTheme } from '@mui/joy/styles';
import { useState } from 'react';
import { ChatDrawerWidth } from '../constants/ui';
import useMediaQuery from './useMediaQuery';

type DrawerVariants = 'temporary' | 'persistent' | 'permanent' | undefined;

const useChatDrawer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md').split(' ')[1]);
  const [isMobileOpen, setMobileOpen] = useState(false);

  const drawerVariant: DrawerVariants = isMobile ? 'temporary' : 'persistent';
  const drawerOpen = isMobile ? isMobileOpen : true;
  const drawerWidth = isMobile ? '100%' : ChatDrawerWidth;

  return {
    drawerVariant,
    drawerOpen,
    drawerWidth,
    isMobile,
    isMobileOpen,
    setMobileOpen,
  };
};

export default useChatDrawer;
