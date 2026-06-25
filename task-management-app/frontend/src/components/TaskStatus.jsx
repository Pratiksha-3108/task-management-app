import React from 'react';
import { Card, CardContent, Grid, Typography, LinearProgress, Box, Chip } from '@mui/material';

export default function TaskStatus({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;
  
  const highPriority = tasks.filter(t => t.priority === 'high' && !t.completed).length;
  const medPriority = tasks.filter(t => t.priority === 'medium' && !t.completed).length;
  const lowPriority = tasks.filter(t => t.priority === 'low' && !t.completed).length;

  const completionRate = total > 0 ? (completed / total) * 100 : 0;

  return (
    <Box sx={{ mb: 4 }}>
      <Grid container spacing={3}>
        {/* Total Tasks Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            elevation={0} 
            sx={{ 
              borderRadius: 3, 
              background: 'linear-gradient(135deg, #1e1b4b 0%, #121214 100%)', 
              color: 'white',
              border: '1px solid #312e81'
            }}
          >
            <CardContent sx={{ pb: '16px !important', pt: '16px' }}>
              <Typography 
                variant="overline" 
                display="block" 
                sx={{ opacity: 0.6, fontWeight: 700, letterSpacing: '0.1em', color: '#818cf8' }}
              >
                TOTAL TASKS
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
                <Typography variant="h3" component="div" sx={{ fontWeight: 800, color: '#ffffff' }}>
                  {total}
                </Typography>
                <div className="d-flex align-items-center justify-content-center rounded-circle" style={{ width: '40px', height: '40px', backgroundColor: 'rgba(99, 102, 241, 0.15)' }}>
                  <span className="material-icons" style={{ fontSize: '24px', color: '#818cf8' }}>view_list</span>
                </div>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Completed Tasks Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            elevation={0} 
            sx={{ 
              borderRadius: 3, 
              bgcolor: '#121214', 
              border: '1px solid #1f2937',
              borderLeft: '4px solid #10b981'
            }}
          >
            <CardContent sx={{ pb: '16px !important', pt: '16px' }}>
              <Typography 
                variant="overline" 
                display="block" 
                sx={{ color: '#94a3b8', fontWeight: 700, letterSpacing: '0.1em' }}
              >
                COMPLETED
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
                <Typography variant="h3" component="div" sx={{ fontWeight: 800, color: '#10b981' }}>
                  {completed}
                </Typography>
                <Chip 
                  label="All Done" 
                  size="small" 
                  sx={{ 
                    bgcolor: 'rgba(16, 185, 129, 0.1)', 
                    color: '#34d399', 
                    fontWeight: 700,
                    border: '1px solid rgba(16, 185, 129, 0.2)'
                  }} 
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Pending Tasks Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            elevation={0} 
            sx={{ 
              borderRadius: 3, 
              bgcolor: '#121214', 
              border: '1px solid #1f2937',
              borderLeft: '4px solid #6366f1'
            }}
          >
            <CardContent sx={{ pb: '16px !important', pt: '16px' }}>
              <Typography 
                variant="overline" 
                display="block" 
                sx={{ color: '#94a3b8', fontWeight: 700, letterSpacing: '0.1em' }}
              >
                PENDING ACTION
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
                <Typography variant="h3" component="div" sx={{ fontWeight: 800, color: '#6366f1' }}>
                  {pending}
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  {highPriority > 0 && (
                    <Chip label={`! ${highPriority}`} size="small" color="error" sx={{ fontWeight: 800, typography: 'caption' }} />
                  )}
                  {medPriority > 0 && (
                    <Chip label={`~ ${medPriority}`} size="small" color="warning" sx={{ fontWeight: 800, typography: 'caption' }} />
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Completion Progress Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            elevation={0} 
            sx={{ 
              borderRadius: 3, 
              bgcolor: '#121214', 
              border: '1px solid #1f2937'
            }}
          >
            <CardContent sx={{ pb: '16px !important', pt: '16px' }}>
              <Typography 
                variant="overline" 
                display="block" 
                sx={{ color: '#94a3b8', fontWeight: 700, letterSpacing: '0.1em' }}
              >
                PERFORMANCE RATIO
              </Typography>
              <Box sx={{ mt: 1.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#94a3b8' }}>
                    Completion Rate
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 800, color: '#818cf8' }}>
                    {Math.round(completionRate)}%
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={completionRate} 
                  sx={{ 
                    height: 6, 
                    borderRadius: 4, 
                    backgroundColor: '#1c1c1f',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 4,
                      backgroundColor: '#6366f1'
                    }
                  }} 
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
