import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Button,
  Box,
  CardActions,
} from "@mui/material";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import type { Task } from "@/types/task.data";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        alignItems: "center",
        margin: "8px",
        backgroundColor: "#1e1e1e",
        color: "#ffffff",
        ":hover": {
          boxShadow: "0 4px 12px rgba(255, 255, 255, 0.2)",
        },
        paddingBottom: "-10px",
      }}
    >
      <CardContent
        sx={{
          flexGrow: 1,
          cursor: "pointer",
          padding: "12px",
          paddingBottom: 0,
        }}
        onClick={() => onEdit(task)}
      >
        {/* Title */}
        <Typography
          gutterBottom
          sx={{
            overflow: "hidden",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
            textOverflow: "ellipsis",
            fontWeight: 600,
            fontSize: 13,
          }}
        >
          {task.title}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: "hidden",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
            textOverflow: "ellipsis",
            fontSize: 11,
          }}
        >
          {task.description || "(No description)"}
        </Typography>

        {/* Divider */}
        <Divider
          sx={{
            marginY: 1,
          }}
        />

        <Button
          size="small"
          variant="text"
          color="inherit"
          startIcon={<CalendarMonthRoundedIcon />}
          sx={{
            padding: 0,
            justifyContent: "flex-start",
          }}
        >
          {task.dueDate || "No due date"}
        </Button>

        {/* Due Date */}
      </CardContent>
    </Card>
  );
};

export default TaskCard;
