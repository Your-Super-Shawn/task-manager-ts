import React from "react";
import Image from "next/image";
import { Box, Link, Typography } from "@mui/material";

const PageFooter = () => {
  return (
    <Box
      component="footer"
      sx={{
        textAlign: "center",
        marginTop: "auto",
        padding: 2,
      }}
    >
      <Link
        href="https://github.com/Your-Super-Shawn/task-manager-ts"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          textDecoration: "none",
          color: "inherit",
          fontFamily: "var(--font-geist-mono)",
        }}
      >
        <Image
          aria-hidden
          src="/github-mark-white.svg"
          alt="GitHub icon"
          width={16}
          height={16}
        />
        <Typography
          variant="body2"
          sx={{
            fontFamily: "var(--font-geist-mono)",
          }}
        >
          Go to GitHub →
        </Typography>
      </Link>
    </Box>
  );
};

export default PageFooter;
