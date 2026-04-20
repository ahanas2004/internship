const Company = require('../models/Company');
const Lead = require('../models/Lead');

// @desc    Create a company
// @route   POST /api/companies
// @access  Private
const createCompany = async (req, res) => {
  try {
    const { name, industry, location } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Company name is required' });
    }

    const company = await Company.create({
      name,
      industry,
      location,
    });

    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all companies
// @route   GET /api/companies
// @access  Private
const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find().sort({ createdAt: -1 });
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get company details and associated leads
// @route   GET /api/companies/:id
// @access  Private
const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    // Get associated leads
    const leads = await Lead.find({ company: company._id, isDeleted: false })
      .populate('assignedTo', 'name email');

    res.json({ company, leads });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createCompany, getCompanies, getCompanyById };
