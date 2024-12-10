import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Button,
  Box,
} from "@mui/material";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import type { Task } from "@/types/task.data";
import dayjs from "dayjs";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit }) => {
  // Function to handle button color by due date
  const handleButtonColorByDueDate = (dueDate: string) => {
    // if dueDate is not set, return "inherit"
    if (!dueDate) return "inherit";

    const today = dayjs();
    const due = dayjs(dueDate);
    const diff = due.diff(today, "day");

    if (diff < 0) {
      // if due date is passed
      return "error";
    } else if (diff < 3) {
      // if due date is within 3 days
      return "warning";
    } else {
      // if due date is more than 3 days
      return "inherit";
    }
  };

  // Function to get day left
  const getDayLeft = (dueDate: string) => {
    if (!dueDate) return "";

    const today = dayjs();
    const due = dayjs(dueDate);
    const diff = due.diff(today, "day");

    if (diff < 0) {
      return `Expired ${Math.abs(diff)} days ago`;
    } else if (diff === 0) {
      return "Due today";
    } else if (diff === 1) {
      return "Due tomorrow";
    } else if (diff > 1) {
      return `Due in ${diff} days`;
    } else {
      return "";
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        margin: "8px",
        backgroundColor: "#1e1e1e",
        color: "#ffffff",
        ":hover": {
          boxShadow: "0 4px 12px rgba(255, 255, 255, 0.2)",
        },
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "16px",
          gap: "8px",
          cursor: "pointer",
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
          align="left"
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
            width: "100%",
          }}
        />

        {/* Due Date and Placeholder */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Button
            size="small"
            variant="text"
            color={handleButtonColorByDueDate(task.dueDate || "")}
            startIcon={<CalendarMonthRoundedIcon />}
            sx={{
              padding: 0,
              justifyContent: "flex-start",
              textTransform: "none",
            }}
          >
            {task.dueDate
              ? dayjs(task.dueDate).format("DD/MM/YYYY")
              : "No due date"}
          </Button>
          {/* Placeholder */}
          <Typography
            variant="caption"
            color={handleButtonColorByDueDate(task.dueDate || "")}
            sx={{
              fontSize: 12,
              textAlign: "right",
            }}
          >
            {getDayLeft(task.dueDate || "")}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
