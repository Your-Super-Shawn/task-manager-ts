import { useEffect, useState } from "react";
import type { Task } from "@/types/task.data";

export type NewTask = Omit<Task, "_id">;

interface SnackbarState {
  message: string;
  type: "success" | "error";
}

export default function useTasks(pollingInterval: number = 10000) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<SnackbarState | null>(null);

  // Fetch tasks from the server
  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/tasks");
      if (!response.ok) {
        throw new Error(`Error fetching tasks: ${response.statusText}`);
      }
      const newTasks = await response.json();

      console.log("Fetched tasks:", newTasks);

      // Compare and update tasks only if different
      if (JSON.stringify(tasks) !== JSON.stringify(newTasks)) {
        setTasks(newTasks);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load tasks");
      setSnackbar({ message: "Failed to load tasks", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Add a new task
  const addTask = async (newTask: NewTask) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      if (!response.ok) {
        throw new Error(`Error adding task: ${response.statusText}`);
      }
      const createdTask = await response.json();
      await fetchTasks(); // Refresh tasks after adding
      setSnackbar({ message: "Task added successfully", type: "success" });
      return createdTask;
    } catch (err) {
      console.error(err);
      setError("Failed to add task");
      setSnackbar({ message: "Failed to add task", type: "error" });
    }
  };

  // Update an existing task
  const updateTask = async (_id: string, updates: Partial<NewTask>) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id, ...updates }),
      });
      if (!response.ok) {
        throw new Error(`Error updating task: ${response.statusText}`);
      }
      await fetchTasks(); // Refresh tasks after updating
      setSnackbar({ message: "Task updated successfully", type: "success" });
    } catch (err) {
      console.error(err);
      setError("Failed to update task");
      setSnackbar({ message: "Failed to update task", type: "error" });
    }
  };

  // Delete a task
  const deleteTask = async (_id: string) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id }),
      });
      if (!response.ok) {
        throw new Error(`Error deleting task: ${response.statusText}`);
      }
      await fetchTasks(); // Refresh tasks after deleting
      setSnackbar({ message: "Task deleted successfully", type: "success" });
    } catch (err) {
      console.error(err);
      setError("Failed to delete task");
      setSnackbar({ message: "Failed to delete task", type: "error" });
    }
  };

  // Polling: fetch tasks at a regular interval
  // For demo purposes, just use a simple setInterval here :)
  useEffect(() => {
    fetchTasks();

    const interval = setInterval(fetchTasks, pollingInterval);
    return () => clearInterval(interval);
  }, [pollingInterval]);

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
    snackbar,
    setSnackbar,
  };
}
