import { useEffect, useState, useCallback } from "react";
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Grid,
  Fab,
  Snackbar,
  Alert,
  Slide,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PageHead from "@/components/PageHead";
import PageFooter from "@/components/PageFooter";
import useTasks from "@/hooks/useTasks";
import CreateTaskDialog from "@/components/Dialogs/CreateTaskDialog";
import EditTaskDialog from "@/components/Dialogs/EditTaskDialog";
import TaskAccordion from "@/components/Accordions/TaskAccordion";
import { Task } from "@/types/task.data";
import debounce from "lodash/debounce";

export default function Home() {
  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    loading,
    error,
    snackbar,
    setSnackbar,
  } = useTasks();

  // Local states
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Sync taskList with tasks from the hook
  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);

  // Debounced `handleCreate`
  const handleCreate = useCallback(
    debounce(async (newTask: Omit<Task, "_id">) => {
      try {
        const createdTask = await addTask(newTask);
        setTaskList((prev) => [...prev, createdTask]);
      } catch (error) {
        console.error("Failed to create task:", error);
      }
    }, 300),
    [addTask]
  );

  // Debounced `handleSave`
  const handleSave = useCallback(
    debounce(async (updatedTask: Task) => {
      try {
        await updateTask(updatedTask._id, updatedTask);
        setTaskList((prev) =>
          prev.map((t) => (t._id === updatedTask._id ? updatedTask : t))
        );
        setIsEditOpen(false);
      } catch (error) {
        console.error("Failed to update task:", error);
      }
    }, 300),
    [updateTask]
  );

  // Debounced `handleDelete`
  const handleDelete = useCallback(
    debounce(async (taskId: string) => {
      try {
        await deleteTask(taskId);
        setTaskList((prev) => prev.filter((t) => t._id !== taskId));
      } catch (error) {
        console.error("Failed to delete task:", error);
      }
    }, 300),
    [deleteTask]
  );

  const handleEditClicked = (task: Task) => {
    setSelectedTask(task);
    setIsEditOpen(true);
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return; // Prevent closing when clicking outside
    setSnackbar(null); // Clear the snackbar state
  };

  // Group tasks by status
  const groupedTasks = taskList.reduce(
    (acc, task) => {
      if (!acc[task.status]) {
        acc[task.status] = [];
      }
      acc[task.status].push(task);
      return acc;
    },
    { "To-do": [], "In progress": [], Completed: [] } as Record<string, Task[]>
  );

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
        <Container maxWidth="lg" sx={{ textAlign: "center", marginY: 4 }}>
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

          {/* Task Accordions */}
          <Grid container spacing={2}>
            {Object.entries(groupedTasks).map(([status, tasks]) => (
              <Grid item xs={12} md={4} key={status}>
                <TaskAccordion
                  key={tasks[0]?._id}
                  title={status}
                  tasks={tasks}
                  onEdit={handleEditClicked}
                  onDelete={handleDelete}
                />
              </Grid>
            ))}
          </Grid>

          <EditTaskDialog
            open={isEditOpen}
            task={selectedTask}
            onClose={() => setIsEditOpen(false)}
            onSave={handleSave}
          />

          <CreateTaskDialog
            open={isCreateOpen}
            onClose={() => setIsCreateOpen(false)}
            onCreate={handleCreate}
          />

          {/* Snackbar */}
          {snackbar && (
            <Snackbar
              open={!!snackbar} // Open when snackbar is not null
              autoHideDuration={2500}
              onClose={handleCloseSnackbar}
              TransitionComponent={Slide}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
              <Alert onClose={handleCloseSnackbar} severity={snackbar.type}>
                {snackbar.message}
              </Alert>
            </Snackbar>
          )}

          {/* Add Button */}
          <Fab
            color="primary"
            aria-label="add"
            sx={{ position: "fixed", bottom: 36, right: 36 }}
            onClick={() => setIsCreateOpen(true)}
          >
            <AddIcon />
          </Fab>
        </Container>

        {/* Footer Section */}
        <PageFooter />
      </Box>
    </>
  );
}
