import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Snackbar, 
  Alert, 
  Typography, 
  CircularProgress,
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TaskStatus from '../components/TaskStatus';
import TaskList from '../components/TaskList';
import TaskModal from '../components/TaskModal';
import taskService from '../services/taskService';

export default function Home({ tasks, setTasks, loading, error, fetchTasks }) {
  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Delete Confirmation State
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [taskToDeleteId, setTaskToDeleteId] = useState(null);

  // Snackbar Feedback State
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' // 'success' | 'info' | 'warning' | 'error'
  });

  // Snackbar controls
  const triggerSnackbar = (message, severity = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  // Create or Update task handler
  const handleFormSubmit = async (taskData) => {
    try {
      if (taskToEdit) {
        // Edit Mode
        const updatedTask = await taskService.updateTask(taskToEdit.id, taskData);
        setTasks(prev => prev.map(t => t.id === taskToEdit.id ? updatedTask : t));
        triggerSnackbar(`Task "${updatedTask.title}" updated successfully!`, 'success');
      } else {
        // Create Mode
        const newTask = await taskService.createTask(taskData);
        setTasks(prev => [...prev, newTask]);
        triggerSnackbar(`Task "${newTask.title}" created successfully!`, 'success');
      }
    } catch (err) {
      console.error('Error saving task:', err);
      triggerSnackbar('Failed to persist task. Please try again.', 'error');
    } finally {
      setTaskToEdit(null);
    }
  };

  // Toggle Complete direct handler
  const handleToggleComplete = async (task) => {
    try {
      const updated = await taskService.updateTask(task.id, { 
        completed: !task.completed 
      });
      setTasks(prev => prev.map(t => t.id === task.id ? updated : t));
      triggerSnackbar(
        `Task marked as ${updated.completed ? 'completed' : 'incomplete'}!`, 
        'info'
      );
    } catch (err) {
      console.error('Error toggling task:', err);
      triggerSnackbar('Failed to update task status.', 'error');
    }
  };

  // Trigger modal for creation
  const handleCreateClick = () => {
    setTaskToEdit(null);
    setModalOpen(true);
  };

  // Trigger modal for editing
  const handleEditClick = (task) => {
    setTaskToEdit(task);
    setModalOpen(true);
  };

  // Delete handler (triggers confirmation dialog)
  const handleDeleteClick = (id) => {
    setTaskToDeleteId(id);
    setDeleteConfirmOpen(true);
  };

  // Perform delete action once confirmed
  const handleConfirmDelete = async () => {
    if (!taskToDeleteId) return;
    try {
      await taskService.deleteTask(taskToDeleteId);
      const taskName = tasks.find(t => t.id === taskToDeleteId)?.title || 'Task';
      setTasks(prev => prev.filter(t => t.id !== taskToDeleteId));
      triggerSnackbar(`"${taskName}" deleted successfully!`, 'warning');
    } catch (err) {
      console.error('Error deleting task:', err);
      triggerSnackbar('Failed to delete the task.', 'error');
    } finally {
      setDeleteConfirmOpen(false);
      setTaskToDeleteId(null);
    }
  };

  return (
    <Box>
      <Box sx={{ py: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 850, color: '#ffffff', letterSpacing: '-0.03em' }}>
            Board Workspace
          </Typography>
          <Typography variant="body2" sx={{ color: '#94a3b8' }}>
            Organize, prioritize, and capture operations effortlessly.
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={handleCreateClick}
          sx={{ 
            borderRadius: 2, 
            px: 3, 
            py: 1, 
            fontWeight: 600,
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.25)',
            textTransform: 'none'
          }}
        >
          Add Task
        </Button>
      </Box>

      {/* Main content display */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 12 }}>
          <CircularProgress size={50} thickness={4.5} />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ py: 2, borderRadius: 3 }}>
          {error}
        </Alert>
      ) : (
        <>
          <TaskStatus tasks={tasks} />
          
          <TaskList 
            tasks={tasks} 
            onToggleComplete={handleToggleComplete}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
          />
        </>
      )}

      {/* Adding/Editing Modal */}
      <TaskModal 
        open={modalOpen} 
        onClose={() => {
          setModalOpen(false);
          setTaskToEdit(null);
        }}
        onSubmit={handleFormSubmit}
        taskToEdit={taskToEdit}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => {
          setDeleteConfirmOpen(false);
          setTaskToDeleteId(null);
        }}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: '#1E1E21',
              border: '1px solid #374151',
              borderRadius: 3,
              p: 1
            }
          }
        }}
      >
        <DialogTitle sx={{ color: '#f1f5f9', fontWeight: 700 }}>
          Delete Task?
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: '#94a3b8' }}>
            Are you sure you want to delete this task? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button 
            onClick={() => {
              setDeleteConfirmOpen(false);
              setTaskToDeleteId(null);
            }} 
            sx={{ color: '#94a3b8', textTransform: 'none', fontWeight: 600 }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmDelete} 
            variant="contained"
            color="error"
            sx={{ 
              borderRadius: 2, 
              px: 3, 
              fontWeight: 600, 
              textTransform: 'none',
              boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)' 
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Sticky float for mobile view */}
      <Fab 
        color="primary" 
        aria-label="add" 
        onClick={handleCreateClick}
        sx={{ 
          position: 'fixed', 
          bottom: 24, 
          right: 24, 
          display: { sm: 'none' },
          boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)'
        }}
      >
        <AddIcon />
      </Fab>

      {/* Alerts Snackbar */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={4000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity} 
          variant="filled"
          sx={{ width: '100%', borderRadius: 2, fontWeight: 500 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
