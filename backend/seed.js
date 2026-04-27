const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const User = require('./models/User');
const Company = require('./models/Company');
const Lead = require('./models/Lead');
const Task = require('./models/Task');

mongoose.connect(process.env.MONGODB_URI);

const seedData = async () => {
  try {
    await User.deleteMany();
    await Company.deleteMany();
    await Lead.deleteMany();
    await Task.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('password123', salt);

    const user1 = await User.create({ name: 'Admin User', email: 'admin@minicrm.com', password });
    const user2 = await User.create({ name: 'John Doe', email: 'john@minicrm.com', password });

    const company1 = await Company.create({ name: 'Technova', industry: 'IT', location: 'New York' });
    const company2 = await Company.create({ name: 'Global Logistics', industry: 'Logistics', location: 'London' });

    const lead1 = await Lead.create({
      name: 'Sarah Smith',
      email: 'sarah@technova.com',
      phone: '1234567890',
      status: 'New',
      assignedTo: user1._id,
      company: company1._id
    });

    const lead2 = await Lead.create({
      name: 'Michael Jordan',
      email: 'mj@logistics.com',
      status: 'Contacted',
      assignedTo: user2._id,
      company: company2._id
    });

    await Task.create({
      title: 'Call to discuss partnership',
      lead: lead1._id,
      assignedTo: user1._id,
      dueDate: new Date(),
      status: 'Pending'
    });

    console.log('Database seeded successfully!');
    console.log('Test login: \nEmail: admin@minicrm.com\nPassword: password123');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
