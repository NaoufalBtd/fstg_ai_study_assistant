import { Message } from "@/types";
import { shortenString } from "@/utils/textFormat";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import StarBorderIcon from "@mui/icons-material/Star";
import { Box, Card, Typography } from "@mui/joy";
import React, { useState } from "react";
import FlexBox from "./FlexBox";

interface AccordionProps {
  title: string;
  messages: Message[];
}

const CustomAccordion: React.FC<AccordionProps> = ({ title, messages }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ margin: "10px", padding: "10px" }}>
      <Box
        onClick={handleToggle}
        sx={{
          cursor: "pointer",
          marginBottom: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <FlexBox>
          <StarBorderIcon />
          <Typography level="body1" sx={{ ml: 2, fontWeight: "bold" }}>
            {title}
          </Typography>
        </FlexBox>
        <KeyboardArrowDownIcon sx={{ mr: 2 }} />
      </Box>
      {expanded && (
        <Box sx={{ marginTop: "10px" }}>
          {messages.map((message) => (
            <Box key={message.id}>
              <p style={{ margin: "0" }}>{shortenString(message.content)}</p>
            </Box>
          ))}
        </Box>
      )}
    </Card>
  );
};

export default CustomAccordion;
