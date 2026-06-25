import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  IconButton, 
  Typography, 
  Box 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TaskForm from './TaskForm';

export default function TaskModal({ open, onClose, onSubmit, taskToEdit }) {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            p: 1,
            boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.12)'
          }
        }
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 700, color: '#f1f5f9' }}>
          {taskToEdit ? 'Edit Task Details' : 'Create New Task'}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent dividers sx={{ border: 'none', px: 2, pb: 3 }}>
        <TaskForm 
          initialData={taskToEdit} 
          onSubmit={(data) => {
            onSubmit(data);
            onClose();
          }} 
          onCancel={onClose} 
        />
      </DialogContent>
    </Dialog>
  );
}
