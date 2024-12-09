import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
} from "@mui/material";
import { Task } from "@/types/task.data";
import DatePicker from "@/components/DateTimePicker/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { statusOptions } from "@/data/status.options";

interface CreateTaskDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (newTask: Omit<Task, "_id">) => void;
}

const MAX_TITLE_LENGTH = 50;
const MAX_DESCRIPTION_LENGTH = 200;

const CreateTaskDialog: React.FC<CreateTaskDialogProps> = ({
  open,
  onClose,
  onCreate,
}) => {
  const [newTask, setNewTask] = useState<Omit<Task, "_id">>({
    title: "",
    description: "",
    status: "To-do",
    dueDate: "",
  });

  const handleInputChange = (field: keyof Omit<Task, "_id">, value: string) => {
    setNewTask({ ...newTask, [field]: value });
  };

  const handleDateChange = (newDate: Dayjs | null) => {
    setNewTask({
      ...newTask,
      dueDate: newDate && newDate.isValid() ? newDate.toISOString() : "",
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create Task</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            fullWidth
            label="Title"
            value={newTask.title}
            onChange={(e) =>
              handleInputChange(
                "title",
                e.target.value.slice(0, MAX_TITLE_LENGTH)
              )
            }
            helperText={`${newTask.title.length}/${MAX_TITLE_LENGTH}`}
            margin="dense"
          />

          <TextField
            fullWidth
            label="Description"
            value={newTask.description}
            onChange={(e) =>
              handleInputChange(
                "description",
                e.target.value.slice(0, MAX_DESCRIPTION_LENGTH)
              )
            }
            helperText={`${newTask.description?.length}/${MAX_DESCRIPTION_LENGTH}`}
            margin="dense"
            multiline
            rows={4}
          />

          <DatePicker
            value={newTask.dueDate ? dayjs(newTask.dueDate) : null}
            onChange={handleDateChange}
            label="Due Date"
          />

          <TextField
            fullWidth
            select
            label="Status"
            value={newTask.status}
            onChange={(e) => handleInputChange("status", e.target.value)}
          >
            {statusOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            onCreate(newTask);
            onClose();
          }}
          color="primary"
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateTaskDialog;
