import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TaskCard from "@/components/Cards/TaskCard";
import type { Task } from "@/types/task.data";

interface TaskAccordionProps {
  title: string;
  tasks: Task[];
  onEdit: (task: Task) => void;
}

const TaskAccordion: React.FC<TaskAccordionProps> = ({
  title,
  tasks,
  onEdit,
}) => {
  return (
    <Accordion
      defaultExpanded
      sx={{
        backgroundColor: "#1e1e1e",
        color: "#ffffff",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: "#ffffff" }} />}
        sx={{
          backgroundColor: "#2a2a2a",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#3a3a3a",
          },
        }}
      >
        <Box
          sx={{
            display: "flex-inline",
            alignItems: "center",
            gap: 2,
            width: "100%",
          }}
        >
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Typography variant="body2">{tasks.length}</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} onEdit={onEdit} />
          ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default TaskAccordion;
