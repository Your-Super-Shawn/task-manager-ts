import Image from "next/image";
import { Box, Typography, Button, Link, Container } from "@mui/material";
import PageHead from "@/components/PageHead";

export default function Home() {
  return (
    <>
      <PageHead pageTitle="Home" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: "100vh",
          padding: 3,
          backgroundColor: "#121212",
          color: "#fff",
          fontFamily: "var(--font-geist-sans)",
        }}
      >
        {/* Header Section */}
        <Container maxWidth="sm" sx={{ textAlign: "center", marginY: 4 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.5rem", sm: "3rem" },
              fontWeight: 700,
              marginBottom: 2,
              fontFamily: "var(--font-geist-sans)",
            }}
          >
            Task Manager
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "1.25rem",
              marginBottom: 4,
              fontFamily: "var(--font-geist-mono)",
            }}
          >
            Organize your tasks efficiently with a modern interface.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => alert("Let's get started!")}
            sx={{
              fontWeight: 600,
              fontFamily: "var(--font-geist-sans)",
            }}
          >
            Get Started
          </Button>
        </Container>

        {/* Footer Section */}
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
      </Box>
    </>
  );
}
