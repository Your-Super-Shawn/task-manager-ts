import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import type { Task } from "@/types/task.data";
import dayjs from "dayjs";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Open the menu
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Close the menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Function to handle button color by due date
  const handleButtonColorByDueDate = (dueDate: string) => {
    if (!dueDate) return "inherit";

    const today = dayjs();
    const due = dayjs(dueDate);
    const diff = due.diff(today, "day");

    if (diff < 0) {
      return "error";
    } else if (diff < 3) {
      return "warning";
    } else {
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
    } else {
      return `Due in ${diff} days`;
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
          ".icon-button": {
            opacity: 1,
          },
        },
        position: "relative",
      }}
    >
      {/* IconButton for Actions */}
      <IconButton
        className="icon-button"
        size="small"
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          opacity: 0,
          color: "#ffff",
          transition: "opacity 0.3s ease",
        }}
        onClick={handleMenuOpen}
      >
        <MoreHorizRoundedIcon color="inherit" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            handleMenuClose();
            onDelete(task._id);
          }}
        >
          Delete
        </MenuItem>
      </Menu>

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "16px",
          gap: "8px",
          cursor: "pointer",
          // position: "relative",
        }}
        onClick={() => onEdit(task)}
      >
        {/* Title */}
        <Typography
          gutterBottom
          align="left"
          sx={{
            overflow: "hidden",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
            textOverflow: "ellipsis",
            fontWeight: 600,
            fontSize: 13,
            marginRight: 4,
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
