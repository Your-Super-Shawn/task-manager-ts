import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import type { Task } from "@/types/task.data";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        margin: 1,
        backgroundColor: "#1e1e1e",
        color: "#ffffff",
        cursor: "pointer",
        ":hover": {
          boxShadow: "0 4px 12px rgba(255, 255, 255, 0.2)",
        },
      }}
      onClick={() => onEdit(task)} // Click event handler
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {task.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {task.description || "No description"}
        </Typography>
        <Typography variant="caption" display="block" color="text.secondary">
          Due:{" "}
          {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}
        </Typography>
        <Typography variant="caption" color="primary">
          Status: {task.status}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="error"
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click event
            onDelete(task);
          }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default TaskCard;
