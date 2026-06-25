import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  FormControlLabel, 
  Checkbox, 
  Box, 
  Grid,
  Alert
} from '@mui/material';

export default function TaskForm({ initialData, onSubmit, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState('');

  // Hydrate form when initialData changes (e.g., when editing tasks)
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setPriority(initialData.priority || 'medium');
      setCompleted(initialData.completed || false);
    } else {
      // Clear for new task
      setTitle('');
      setDescription('');
      setPriority('medium');
      setCompleted(false);
    }
    setError('');
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Task title is required.');
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      priority,
      completed
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="task-title"
            label="Task Title"
            variant="outlined"
            size="medium"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Revise marketing strategy"
            slotProps={{ label: { shrink: true } }}
            autoFocus
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            id="task-description"
            label="Description"
            variant="outlined"
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add some details about this task..."
            slotProps={{ label: { shrink: true } }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel id="task-priority-label" shrink>Priority</InputLabel>
            <Select
              labelId="task-priority-label"
              id="task-priority"
              value={priority}
              label="Priority"
              notched
              onChange={(e) => setPriority(e.target.value)}
            >
              <MenuItem value="low">Low Priority</MenuItem>
              <MenuItem value="medium">Medium Priority</MenuItem>
              <MenuItem value="high">High Priority</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
          {initialData && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={completed}
                  onChange={(e) => setCompleted(e.target.checked)}
                  color="success"
                />
              }
              label="Mark task as Completed"
              sx={{ ml: 1 }}
            />
          )}
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
        <Button 
          variant="outlined" 
          color="inherit" 
          onClick={onCancel}
          sx={{ borderRadius: 2, px: 3 }}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          variant="contained" 
          color="primary"
          sx={{ borderRadius: 2, px: 4, fontWeight: 600 }}
        >
          {initialData ? 'Save Changes' : 'Create Task'}
        </Button>
      </Box>
    </Box>
  );
}
