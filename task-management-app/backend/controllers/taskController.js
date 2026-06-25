import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tasksFilePath = path.join(__dirname, '../data/tasks.json');

// Helper to safely read tasks from local tasks.json file
async function readTasksFromFile() {
  try {
    const data = await fs.readFile(tasksFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // Create empty file if not found
      await fs.writeFile(tasksFilePath, JSON.stringify([], null, 2));
      return [];
    }
    console.error('Error reading tasks file:', error);
    return [];
  }
}

// Helper to write tasks to local tasks.json file
async function writeTasksToFile(tasks) {
  try {
    const dir = path.dirname(tasksFilePath);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(tasksFilePath, JSON.stringify(tasks, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error writing to tasks file:', error);
    return false;
  }
}

// GET /tasks - Get all tasks
export async function getTasks(req, res) {
  try {
    const tasks = await readTasksFromFile();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve tasks', error: error.message });
  }
}

// POST /tasks - Create a new task
export async function createTask(req, res) {
  try {
    const { title, description, priority, completed } = req.body;
    
    if (!title || title.trim() === '') {
      return res.status(400).json({ message: 'Task title is required' });
    }

    const tasks = await readTasksFromFile();
    
    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      description: (description || '').trim(),
      completed: completed === undefined ? false : !!completed,
      priority: priority || 'medium'
    };

    tasks.push(newTask);
    const success = await writeTasksToFile(tasks);
    
    if (success) {
      res.status(201).json(newTask);
    } else {
      res.status(500).json({ message: 'Error writing task to persistence' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to create task', error: error.message });
  }
}

// PUT /tasks/:id - Update an existing task
export async function updateTask(req, res) {
  try {
    const { id } = req.params;
    const { title, description, priority, completed } = req.body;

    const tasks = await readTasksFromFile();
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
      return res.status(404).json({ message: `Task with id ${id} not found` });
    }

    // Apply updates gracefully
    const existingTask = tasks[taskIndex];
    const updatedTask = {
      ...existingTask,
      title: title !== undefined ? title.trim() : existingTask.title,
      description: description !== undefined ? description.trim() : existingTask.description,
      priority: priority !== undefined ? priority : existingTask.priority,
      completed: completed !== undefined ? !!completed : existingTask.completed
    };

    if (updatedTask.title === '') {
      return res.status(400).json({ message: 'Task title cannot be empty' });
    }

    tasks[taskIndex] = updatedTask;
    const success = await writeTasksToFile(tasks);

    if (success) {
      res.status(200).json(updatedTask);
    } else {
      res.status(500).json({ message: 'Error writing updated task to persistence' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update task', error: error.message });
  }
}

// DELETE /tasks/:id - Delete a task
export async function deleteTask(req, res) {
  try {
    const { id } = req.params;

    const tasks = await readTasksFromFile();
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
      return res.status(404).json({ message: `Task with id ${id} not found` });
    }

    const deletedTask = tasks.splice(taskIndex, 1)[0];
    const success = await writeTasksToFile(tasks);

    if (success) {
      res.status(200).json({ message: 'Task deleted successfully', task: deletedTask });
    } else {
      res.status(500).json({ message: 'Error saving state after deletion' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete task', error: error.message });
  }
}
