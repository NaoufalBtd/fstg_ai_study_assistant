import { Box } from "@mui/joy";
import { SxProps } from "@mui/system";
import React from "react";

interface FlexBoxProps {
  children: React.ReactNode;
  sx?: SxProps;
  other?: any;
}

const FlexBox: React.FC<FlexBoxProps> = ({ children, sx, ...other }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
      {children}
    </Box>
  );
};

export default FlexBox;
