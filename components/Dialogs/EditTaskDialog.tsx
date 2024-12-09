import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { Task } from "@/types/task.data";

interface EditTaskDialogProps {
  open: boolean;
  task: Task | null;
  onClose: () => void;
  onSave: (updatedTask: Task) => void;
}

const EditTaskDialog: React.FC<EditTaskDialogProps> = ({
  open,
  task,
  onClose,
  onSave,
}) => {
  const [updatedTask, setUpdatedTask] = useState<Task | null>(task);

  // Sync updatedTask with task when task changes
  useEffect(() => {
    setUpdatedTask(task);
  }, [task]);

  const handleInputChange = (field: keyof Task, value: string) => {
    if (!updatedTask) return;
    setUpdatedTask({ ...updatedTask, [field]: value });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Title"
          value={updatedTask?.title || ""}
          onChange={(e) => handleInputChange("title", e.target.value)}
          margin="dense"
        />
        <TextField
          fullWidth
          label="Description"
          value={updatedTask?.description || ""}
          onChange={(e) => handleInputChange("description", e.target.value)}
          margin="dense"
          multiline
          rows={4}
        />
        <TextField
          fullWidth
          label="Due Date"
          type="date"
          value={updatedTask?.dueDate || ""}
          onChange={(e) => handleInputChange("dueDate", e.target.value)}
          margin="dense"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            if (updatedTask) {
              onSave(updatedTask);
            }
            onClose();
          }}
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTaskDialog;
