import React from "react";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";

interface DeleteConfirmationDialogProps {
  open: boolean;
  taskTitle: string;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  open,
  taskTitle,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Are you sure you want to delete "{taskTitle}"?</DialogTitle>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
