import axios from 'axios';

const API_URL = 'https://task-management-app-d6k7.onrender.com/api/tasks';

const taskService = {
  getAllTasks: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  createTask: async (taskData) => {
    const response = await axios.post(API_URL, taskData);
    return response.data;
  },

  updateTask: async (id, taskData) => {
    const response = await axios.put(`${API_URL}/${id}`, taskData);
    return response.data;
  },

  deleteTask: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  }
};

export default taskService;