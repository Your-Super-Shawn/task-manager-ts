import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Grid,
} from "@mui/material";
import PageHead from "@/components/PageHead";
import PageFooter from "@/components/PageFooter";
import { useEffect, useState } from "react";
import useTasks from "@/hooks/useTasks";
import TaskDataTable from "@/components/DataTable/TaskDataTable";
import { Task } from "@/types/task.data";
import TaskCard from "@/components/Cards/TaskCard";
import EditTaskDialog from "@/components/Dialogs/EditTaskDialog";
import DeleteConfirmationDialog from "@/components/Dialogs/DeleteTaskDialog";

export default function Home() {
  const { tasks, addTask, updateTask, deleteTask, loading, error } = useTasks();

  // Local states
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Sync taskList with tasks from the hook
  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setIsEditOpen(true);
  };

  const handleDelete = (task: Task) => {
    setSelectedTask(task);
    setIsDeleteOpen(true);
  };

  const saveTask = async (updatedTask: Task) => {
    try {
      // 调用 hook 中的 updateTask 方法以更新数据库
      await updateTask(updatedTask._id, {
        title: updatedTask.title,
        description: updatedTask.description,
        status: updatedTask.status,
        dueDate: updatedTask.dueDate,
      });

      // 更新本地状态以同步 UI
      setTaskList((prev) =>
        prev.map((t) => (t._id === updatedTask._id ? updatedTask : t))
      );
      setIsEditOpen(false); // 关闭对话框
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const confirmDelete = () => {
    if (selectedTask) {
      setTaskList((prev) => prev.filter((t) => t._id !== selectedTask._id));
    }
    setIsDeleteOpen(false);
  };

  const groupedTasks = taskList.reduce(
    (acc, task) => {
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
          <Box sx={{ padding: 2 }}>
            <Grid container spacing={2}>
              {["To-do", "In progress", "Completed"].map((status) => (
                <Grid item xs={12} md={4} key={status}>
                  <Typography variant="h6" gutterBottom>
                    {status}
                  </Typography>
                  <Box sx={{ maxHeight: "70vh", overflowY: "auto" }}>
                    {groupedTasks[status].map((task) => (
                      <TaskCard
                        key={task._id}
                        task={task}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    ))}
                  </Box>
                </Grid>
              ))}
            </Grid>

            <EditTaskDialog
              open={isEditOpen}
              task={selectedTask}
              onClose={() => setIsEditOpen(false)}
              onSave={saveTask}
            />
            <DeleteConfirmationDialog
              open={isDeleteOpen}
              taskTitle={selectedTask?.title || ""}
              onClose={() => setIsDeleteOpen(false)}
              onConfirm={confirmDelete}
            />
          </Box>
        </Container>

        {/* Footer Section */}
        <PageFooter />
      </Box>
    </>
  );
}
