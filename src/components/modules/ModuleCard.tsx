import { Box, Typography } from "@mui/joy";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface HomeGridProps {
  title: string;
  bg: string;
  id: string;
  slug: string;
  index: number;
}

const HomeCard: React.FC<HomeGridProps> = ({ title, bg, id, slug, index }) => {
  const router = useRouter();
  const [isHover, setIsHover] = useState(false);

  const handleSelectingModule = () => {
    router.push(`/chat/${slug}`);
  };
  return (
    <Box
      bgcolor={bg}
      borderRadius={10}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={handleSelectingModule}
      sx={{
        width: "100%",
        background: bg,
        padding: "5rem 2rem",
        cursor: "pointer",
      }}
      className={`animate__animated animate__bounceIn ${
        isHover ? "animate__pulse" : `animate__delay-${index}s`
      }`}>
      <Typography level="h5" textAlign="center">
        {title}
      </Typography>
    </Box>
  );
};

export default HomeCard;
