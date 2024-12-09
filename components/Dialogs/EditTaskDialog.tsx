import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
  FormHelperText,
} from "@mui/material";
import { Task } from "@/types/task.data";
import DatePicker from "@/components/DateTimePicker/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { statusOptions } from "@/data/status.options";

interface EditTaskDialogProps {
  open: boolean;
  task: Task | null;
  onClose: () => void;
  onSave: (updatedTask: Task) => void;
}

const MAX_TITLE_LENGTH = 50;
const MAX_DESCRIPTION_LENGTH = 200;

const EditTaskDialog: React.FC<EditTaskDialogProps> = ({
  open,
  task,
  onClose,
  onSave,
}) => {
  const [updatedTask, setUpdatedTask] = useState<Task | null>(task);
  const [errors, setErrors] = useState({
    title: "",
    dueDate: "",
  });

  useEffect(() => {
    setUpdatedTask(task);
    setErrors({ title: "", dueDate: "" }); // Reset errors
  }, [task]);

  const validateFields = () => {
    const newErrors = { title: "", dueDate: "" };
    if (!updatedTask?.title) {
      newErrors.title = "Title is required.";
    }
    if (updatedTask?.dueDate && !dayjs(updatedTask.dueDate).isValid()) {
      newErrors.dueDate = "Invalid due date.";
    }
    setErrors(newErrors);
    return !newErrors.title && !newErrors.dueDate;
  };

  const handleSave = () => {
    if (validateFields() && updatedTask) {
      onSave(updatedTask);
      onClose();
    }
  };

  const handleInputChange = (field: keyof Task, value: string) => {
    if (!updatedTask) return;
    setUpdatedTask({ ...updatedTask, [field]: value });
  };

  const handleDateChange = (newDate: Dayjs | null) => {
    if (!updatedTask) return;
    setUpdatedTask({
      ...updatedTask,
      dueDate: newDate && newDate.isValid() ? newDate.toISOString() : "",
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            fullWidth
            label="Title"
            value={updatedTask?.title || ""}
            onChange={(e) =>
              handleInputChange(
                "title",
                e.target.value.slice(0, MAX_TITLE_LENGTH)
              )
            }
            helperText={
              errors.title ||
              `${updatedTask?.title?.length || 0}/${MAX_TITLE_LENGTH}`
            }
            error={!!errors.title}
          />
          <TextField
            fullWidth
            label="Description"
            value={updatedTask?.description || ""}
            onChange={(e) =>
              handleInputChange(
                "description",
                e.target.value.slice(0, MAX_DESCRIPTION_LENGTH)
              )
            }
            helperText={`${
              updatedTask?.description?.length || 0
            }/${MAX_DESCRIPTION_LENGTH}`}
            multiline
            rows={4}
          />
          <DatePicker
            value={updatedTask?.dueDate ? dayjs(updatedTask.dueDate) : null}
            onChange={handleDateChange}
            label="Due Date"
          />
          {errors.dueDate && (
            <FormHelperText error>{errors.dueDate}</FormHelperText>
          )}
          <TextField
            fullWidth
            select
            label="Status"
            value={updatedTask?.status || "To-do"}
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
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTaskDialog;
