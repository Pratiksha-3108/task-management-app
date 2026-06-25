import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Checkbox, 
  IconButton, 
  Chip, 
  TextField, 
  InputAdornment, 
  Box, 
  FormControl, 
  Select, 
  MenuItem, 
  Typography,
  Card
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

export default function TaskList({ tasks, onToggleComplete, onEditClick, onDeleteClick }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  // Filter & Search tasks dynamically
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          task.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' ? true : 
                          statusFilter === 'completed' ? task.completed : !task.completed;
    
    const matchesPriority = priorityFilter === 'all' ? true : 
                            task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getPriorityChip = (priority) => {
    switch (priority) {
      case 'high':
        return (
          <Chip 
            label="CRITICAL" 
            size="small" 
            sx={{ 
              fontWeight: 700, 
              fontSize: '10px', 
              letterSpacing: '0.05em', 
              backgroundColor: 'rgba(239, 68, 68, 0.1)', 
              color: '#f87171',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              minWidth: '80px' 
            }} 
          />
        );
      case 'medium':
        return (
          <Chip 
            label="MEDIUM" 
            size="small" 
            sx={{ 
              fontWeight: 700, 
              fontSize: '10px', 
              letterSpacing: '0.05em', 
              backgroundColor: 'rgba(245, 158, 11, 0.1)', 
              color: '#fbbf24',
              border: '1px solid rgba(245, 158, 11, 0.2)',
              minWidth: '80px' 
            }} 
          />
        );
      default:
        return (
          <Chip 
            label="LOW" 
            size="small" 
            sx={{ 
              fontWeight: 700, 
              fontSize: '10px', 
              letterSpacing: '0.05em', 
              backgroundColor: 'rgba(148, 163, 184, 0.1)', 
              color: '#94a3b8',
              border: '1px solid rgba(148, 163, 184, 0.2)',
              minWidth: '80px' 
            }} 
          />
        );
    }
  };

  return (
    <Card 
      elevation={0} 
      sx={{ 
        p: 3, 
        borderRadius: 3, 
        bgcolor: '#121214', 
        border: '1px solid #1f2937' 
      }}
    >
      
      {/* Filters and Search Bar Container */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, alignItems: { xs: 'stretch', md: 'center' }, mb: 4 }}>
        
        {/* Search */}
        <TextField
          fullWidth
          size="small"
          placeholder="Search task title or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#64748b' }} />
                </InputAdornment>
              ),
            }
          }}
          sx={{ flexGrow: 2 }}
        />

        {/* Status Filter */}
        <Box sx={{ display: 'flex', gap: 1, width: { xs: '100%', md: 'auto' }, minWidth: { xs: '100%', md: 170 } }}>
          <FormControl fullWidth size="small">
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              displayEmpty
              startAdornment={<span className="material-icons opacity-60 me-1" style={{ fontSize: '18px', color: '#818cf8' }}>check_circle_outline</span>}
            >
              <MenuItem value="all">All Statuses</MenuItem>
              <MenuItem value="active">Active Tasks</MenuItem>
              <MenuItem value="completed">Completed Tasks</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Priority Filter */}
        <Box sx={{ display: 'flex', gap: 1, width: { xs: '100%', md: 'auto' }, minWidth: { xs: '100%', md: 170 } }}>
          <FormControl fullWidth size="small">
            <Select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              displayEmpty
              startAdornment={<span className="material-icons opacity-60 me-1" style={{ fontSize: '18px', color: '#818cf8' }}>priority_high</span>}
            >
              <MenuItem value="all">All Priorities</MenuItem>
              <MenuItem value="high">High Priority</MenuItem>
              <MenuItem value="medium">Medium Priority</MenuItem>
              <MenuItem value="low">Low Priority</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Task List Content (Responsive) */}
      {filteredTasks.length === 0 ? (
        <Paper 
          elevation={0} 
          sx={{ 
            border: '1px solid #1f2937', 
            borderRadius: 2, 
            py: 8,
            px: 2,
            textAlign: 'center',
            backgroundColor: '#0a0a0b'
          }}
        >
          <span className="material-icons" style={{ fontSize: '48px', color: '#3f3f46' }}>sentiment_dissatisfied</span>
          <Typography variant="body1" sx={{ mt: 1.5, fontWeight: 600, color: '#94a3b8' }}>
            No matching workspace tasks found
          </Typography>
          <Typography variant="caption" sx={{ color: '#4b5563' }}>
            Try adjusting your filters or search terms
          </Typography>
        </Paper>
      ) : (
        <>
          {/* Desktop Table View (md and up) */}
          <TableContainer 
            component={Paper} 
            elevation={0} 
            sx={{ 
              display: { xs: 'none', md: 'block' },
              border: '1px solid #1f2937', 
              borderRadius: 2, 
              overflow: 'hidden',
              backgroundColor: '#0a0a0b'
            }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="task list table">
              <TableHead sx={{ bgcolor: '#121214' }}>
                <TableRow sx={{ borderBottom: '1px solid #1f2937' }}>
                  <TableCell align="center" style={{ width: '80px', fontWeight: 700, color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</TableCell>
                  <TableCell style={{ fontWeight: 700, color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Task Details</TableCell>
                  <TableCell align="center" style={{ width: '130px', fontWeight: 700, color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Priority</TableCell>
                  <TableCell align="center" style={{ width: '130px', fontWeight: 700, color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTasks.map((task) => (
                  <TableRow 
                    key={task.id} 
                    sx={{ 
                      borderBottom: '1px solid rgba(31, 41, 55, 0.5)',
                      bgcolor: task.completed ? 'rgba(79, 70, 229, 0.02)' : 'inherit',
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.02) !important'
                      },
                      transition: 'background-color 0.15s ease'
                    }}
                  >
                    <TableCell align="center">
                      <Checkbox
                        checked={task.completed}
                        onChange={() => onToggleComplete(task)}
                        color="primary"
                        sx={{ 
                          color: '#4b5563',
                          '&.Mui-checked': {
                            color: '#6366f1'
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            fontWeight: 500,
                            fontSize: '0.925rem',
                            color: task.completed ? '#64748b' : '#f1f5f9',
                            textDecoration: task.completed ? 'line-through' : 'none'
                          }}
                        >
                          {task.title}
                        </Typography>
                        {task.description && (
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              mt: 0.5,
                              fontSize: '0.775rem',
                              color: '#4b5563',
                              lineHeight: '1.2rem',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden'
                            }}
                          >
                            {task.description}
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      {getPriorityChip(task.priority)}
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                        <IconButton 
                          size="small" 
                          onClick={() => onEditClick(task)}
                          disabled={task.completed}
                          sx={{ 
                            color: '#818cf8',
                            bgcolor: 'rgba(99, 102, 241, 0.1)',
                            '&:hover': { bgcolor: 'rgba(99, 102, 241, 0.2)' },
                            '&.Mui-disabled': { opacity: 0.3, color: '#4b5563' }
                          }}
                        >
                          <EditIcon style={{ fontSize: '18px' }} />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          onClick={() => onDeleteClick(task.id)}
                          sx={{ 
                            color: '#f87171',
                            bgcolor: 'rgba(239, 68, 68, 0.1)',
                            '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.2)' }
                          }}
                        >
                          <DeleteIcon style={{ fontSize: '18px' }} />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Mobile Card List View (less than md screens) */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', gap: 2 }}>
            {filteredTasks.map((task) => (
              <Card 
                key={task.id} 
                elevation={0}
                sx={{ 
                  bgcolor: '#0a0a0b', 
                  border: '1px solid #1f2937', 
                  borderRadius: 2,
                  p: 2,
                  position: 'relative',
                  borderLeft: task.completed ? '4px solid #4b5563' : (
                    task.priority === 'high' ? '4px solid #ef4444' : 
                    task.priority === 'medium' ? '4px solid #f59e0b' : '4px solid #94a3b8'
                  ),
                  opacity: task.completed ? 0.75 : 1,
                  transition: 'all 0.2s ease'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                  <Checkbox
                    checked={task.completed}
                    onChange={() => onToggleComplete(task)}
                    color="primary"
                    sx={{ 
                      p: 0,
                      mt: 0.5,
                      color: '#4b5563',
                      '&.Mui-checked': {
                        color: '#6366f1'
                      }
                    }}
                  />
                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                      <Typography 
                        variant="subtitle1" 
                        sx={{ 
                          fontWeight: 600,
                          fontSize: '0.95rem',
                          color: task.completed ? '#64748b' : '#f1f5f9',
                          textDecoration: task.completed ? 'line-through' : 'none',
                          wordBreak: 'break-word',
                          lineHeight: 1.3
                        }}
                      >
                        {task.title}
                      </Typography>
                      {getPriorityChip(task.priority)}
                    </Box>
                    
                    {task.description && (
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: '#64748b',
                          fontSize: '0.825rem',
                          lineHeight: '1.25rem',
                          mb: 2,
                          wordBreak: 'break-word'
                        }}
                      >
                        {task.description}
                      </Typography>
                    )}

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, borderTop: '1px solid rgba(31, 41, 55, 0.4)', pt: 1.5 }}>
                      <IconButton 
                        size="small" 
                        onClick={() => onEditClick(task)}
                        disabled={task.completed}
                        sx={{ 
                          color: '#818cf8',
                          bgcolor: 'rgba(99, 102, 241, 0.1)',
                          '&:hover': { bgcolor: 'rgba(99, 102, 241, 0.2)' },
                          '&.Mui-disabled': { opacity: 0.3, color: '#4b5563' }
                        }}
                      >
                        <EditIcon style={{ fontSize: '18px' }} />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={() => onDeleteClick(task.id)}
                        sx={{ 
                          color: '#f87171',
                          bgcolor: 'rgba(239, 68, 68, 0.1)',
                          '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.2)' }
                        }}
                      >
                        <DeleteIcon style={{ fontSize: '18px' }} />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </Card>
            ))}
          </Box>
        </>
      )}
    </Card>
  );
}
