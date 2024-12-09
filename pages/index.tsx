import Image from "next/image";
import { Box, Typography, Button, Link, Container } from "@mui/material";
import PageHead from "@/components/PageHead";
import PageFooter from "@/components/PageFooter";
import { useEffect, useState } from "react";

type Task = {
  _id: string;
  title: string;
  description?: string;
  status: string;
  dueDate?: string;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function fetchTasks() {
      const response = await fetch("/api/tasks");
      const data = await response.json();

      console.log(data);
      setTasks(data);
    }

    fetchTasks();
  }, []);

  return (
    <>
      {/* Page Head */}
      <PageHead pageTitle="Home" />

      {/* Main Content */}
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
        {/* Title Section */}
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
              fontSize: "0.975rem",
              marginBottom: 4,
              fontFamily: "var(--font-geist-mono)",
            }}
          >
            Organise your tasks efficiently with a modern interface ☺️
          </Typography>

          {/* Task List  */}
          <div>
            <ul>
              {tasks.map((task) => (
                <li key={task._id}>
                  <strong>{task.title}</strong>
                  {" <> "}
                  {task.description || "No description"}
                  {" <> "}
                  {task.dueDate || "No due date"}
                  {" <> "}
                  {task.status || "No status"}
                </li>
              ))}
            </ul>
          </div>
        </Container>

        {/* Footer Section */}
        <PageFooter />
      </Box>
    </>
  );
}
