import useUiStore from "@/stores/uiStore";
import { Box } from "@mui/joy";
import React from "react";

interface PolyfillDrawerProps {
  variant?: "temporary" | "permanent" | undefined;
  open?: boolean;
  anchor?: "left" | "right";
  onClose?: () => void;
  children?: React.ReactNode;
}
const PolyfillDrawer: React.FC<PolyfillDrawerProps> = ({
  variant = "temporary",
  open = false,
  anchor = "left",
  onClose,
  children,
}) => {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };
  const { navbarHeight } = useUiStore();

  const drawerStyle = {
    position: "fixed",
    top: navbarHeight,
    bottom: 0,
    // width: 300,
    backgroundColor: "background.body",
    boxShadow: "2px 0px 5px rgba(0,0,0,0.3)",
    // padding: '20px',
    zIndex: 1000,
    overflowY: "auto",
  };

  if (variant === "permanent") {
    drawerStyle.position = "static";
  } else {
    drawerStyle.display = open ? "block" : "none";
  }

  if (anchor === "right") {
    drawerStyle.right = 0;
    drawerStyle.left = "auto";
  } else {
    drawerStyle.left = 0;
    drawerStyle.right = "auto";
  }

  return (
    <>
      {variant === "temporary" && (
        <button onClick={handleClose}>Close Drawer</button>
      )}
      <Box sx={drawerStyle}>
        {variant === "temporary" && (
          <button onClick={handleClose}>Close Drawer</button>
        )}
        {children}
      </Box>
    </>
  );
};

export default PolyfillDrawer;
