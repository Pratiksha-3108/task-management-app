import axios from 'axios';

// Creating an axios instance. Using relative URL ensures seamless development & production hosting
const API_URL = '/api/tasks';

const taskService = {
  // Fetch all tasks
  getAllTasks: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  // Create a new task
  createTask: async (taskData) => {
    const response = await axios.post(API_URL, taskData);
    return response.data;
  },

  // Update a task by id
  updateTask: async (id, taskData) => {
    const response = await axios.put(`${API_URL}/${id}`, taskData);
    return response.data;
  },

  // Delete a task by id
  deleteTask: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  }
};

export default taskService;
