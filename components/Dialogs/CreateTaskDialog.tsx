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
import debounce from "lodash/debounce";

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
  const [errors, setErrors] = useState({
    title: "",
    dueDate: "",
  });

  useEffect(() => {
    if (!open) {
      setNewTask({
        title: "",
        description: "",
        status: "To-do",
        dueDate: "",
      });
      setErrors({ title: "", dueDate: "" }); // Reset errors
    }
  }, [open]);

  const validateFields = () => {
    const newErrors = { title: "", dueDate: "" };
    if (!newTask.title) {
      newErrors.title = "Title is required.";
    }

    if (newTask.dueDate && !dayjs(newTask.dueDate).isValid()) {
      newErrors.dueDate = "Invalid due date.";
    }
    setErrors(newErrors);
    return !newErrors.title && !newErrors.dueDate;
  };

  // Debounced `handleCreate`
  const handleCreate = debounce(() => {
    if (validateFields()) {
      onCreate(newTask);
      handleClose();
    }
  }, 300);

  const handleClose = () => {
    setNewTask({
      title: "",
      description: "",
      status: "To-do",
      dueDate: "",
    });
    setErrors({ title: "", dueDate: "" }); // Reset errors

    onClose();
  };

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
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
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
            helperText={
              errors.title || `${newTask.title.length}/${MAX_TITLE_LENGTH}`
            }
            error={!!errors.title}
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
            multiline
            rows={4}
          />
          <DatePicker
            value={newTask.dueDate ? dayjs(newTask.dueDate) : null}
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
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleCreate} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateTaskDialog;
