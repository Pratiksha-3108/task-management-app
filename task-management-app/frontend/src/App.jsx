import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import taskService from './services/taskService';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

// Define the "Elegant Dark" design theme
const elegantDarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6366f1', // Indigo 500
      light: '#818cf8',
      dark: '#4f46e5',
      contrastText: '#ffffff',
    },
    background: {
      default: '#0A0A0B', // Primary dark background
      paper: '#121214',   // Cards & secondary blocks
    },
    text: {
      primary: '#e2e8f0',   // Gray 200
      secondary: '#94a3b8', // Gray 400
      disabled: '#64748b',
    },
    divider: '#1f2937', // Gray 800 borders
    success: {
      main: '#10b981', // Emerald 500
    },
    warning: {
      main: '#f59e0b', // Amber 500
    },
    error: {
      main: '#ef4444', // Red 500
    },
    info: {
      main: '#3b82f6', // Blue 500
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none', // Remove the default dark mode overlay gradients
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1E1E21', // Modal custom wrapper base background
          border: '1px solid #374151', // Gray 700 border
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(10, 10, 11, 0.4)',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#27272a', // Zinc 800 matching Design HTML
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#3f3f46',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#6366f1',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: '#94a3b8',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
  },
});

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch initial tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.getAllTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Could not connect to the backend database. Ensure the container server is online.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;

  return (
    <ThemeProvider theme={elegantDarkTheme}>
      <CssBaseline />
      <div className="min-vh-100 pb-5" style={{ backgroundColor: '#0A0A0B' }}>
        <Navbar totalTasks={totalTasks} completedTasks={completedTasks} />
        <div className="container">
          <Home 
            tasks={tasks} 
            setTasks={setTasks} 
            loading={loading} 
            error={error} 
            fetchTasks={fetchTasks} 
          />
        </div>
      </div>
    </ThemeProvider>
  );
}
