const Task = require('../models/Task');

// @desc    Create a task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
  try {
    const { title, lead, assignedTo, dueDate } = req.body;

    if (!title || !lead || !assignedTo) {
      return res.status(400).json({ message: 'Title, lead and assigne required' });
    }

    const task = await Task.create({
      title,
      lead,
      assignedTo,
      dueDate,
    });

    await task.populate('lead', 'name');
    await task.populate('assignedTo', 'name');

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate('lead', 'name')
      .populate('assignedTo', 'name')
      .sort({ dueDate: 1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update task status
// @route   PUT /api/tasks/:id
// @access  Private
const updateTaskStatus = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Only assigned user can update status
    if (task.assignedTo.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this task' });
    }

    task.status = req.body.status || task.status;
    await task.save();

    await task.populate('lead', 'name');
    await task.populate('assignedTo', 'name');

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createTask, getTasks, updateTaskStatus };
