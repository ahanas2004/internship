const Lead = require('../models/Lead');
const Task = require('../models/Task');

// @desc    Get dashboard stats
// @route   GET /api/dashboard
// @access  Private
const getDashboardStats = async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments({ isDeleted: false });
    const qualifiedLeads = await Lead.countDocuments({ isDeleted: false, status: 'Contacted' }); // Taking "Contacted" as qualified for simplicity

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const tasksDueToday = await Task.countDocuments({
      dueDate: { $gte: todayStart, $lte: todayEnd },
      status: 'Pending'
    });

    const completedTasks = await Task.countDocuments({ status: 'Done' });

    res.json({
      totalLeads,
      qualifiedLeads,
      tasksDueToday,
      completedTasks
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboardStats };
