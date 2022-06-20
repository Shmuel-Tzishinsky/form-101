const crypto = require('crypto');
const Company = require('../models/Company');
const Forms = require('../models/Forms');
const {
  getCompany,
  getActiveCompanys,
  getAndEditCompany,
  getCompanys,
  getSingleCompanyService
} = require('../services/company.services');

const { registerCompanyValidation } = require('../utils/validation');

const validation = {
  editCompany: registerCompanyValidation,
  addNewCompanyAction: registerCompanyValidation
};

const newCompanyAction = async (req, res) => {
  // Validate data before creating a user

  try {
    await handleValidation(req.body.company, res, 'addNewCompanyAction');
    //   Checking if the company is already in the db
    const emailExist = await Company.findOne({ email: req.body.company.email });

    if (emailExist) {
      return res.status(400).json({ error_msg: 'E-Mail already exists' });
    }
    const token = await crypto.randomBytes(20).toString('hex');
    const { body } = req;
    // Create a new campeny
    const company = new Company({ ...body.company, token });

    const savedCompany = await company.save();
    // Generate and send token
    // const token = await randomTokenGen(savedCompany);
    // const companyToken = new token({ _userId: savedCompany._id, token: token });
    // await companyToken.save();
    if (!token) {
      res.status(500).json({ error_msg: 'An error occured' });
    }
    // Send email using sendgrid here
    return res.status(201).json({ data: savedCompany });
  } catch (err) {
    console.log({ err });
    return res.status(400).json({ error_msg: err.message });
  }
};

const handleValidation = (body, res, type) => {
  const { error } = validation[type](body);

  if (error) {
    throw Error(error.details[0].message);
  }
};

const getAllCompanysAction = async (req, res) => {
  try {
    const totalCompanys = await getCompanys({});

    return res.status(200).json({ data: totalCompanys });
  } catch (err) {
    return res.status(400).json({ error_msg: err.message });
  }
};

const getEditCompanyAction = async (req, res) => {
  try {
    const totalCompanys = await getSingleCompanyService({
      token: req.body.data
    });

    return res.status(200).json({ data: totalCompanys });
  } catch (err) {
    return res.status(400).json({ error_msg: err.message });
  }
};

const getAllActiveCompanysAction = async (req, res) => {
  try {
    const companys = await getActiveCompanys({ isActive: true });
    return res.status(200).json({ data: companys });
  } catch (err) {
    return res.status(400).json({ error_msg: err.message });
  }
};

const getSingleCompanysAction = async (req, res) => {
  try {
    const company = await getSingleCompanyService({ _id: req.params.id });
    return res.status(200).json({ data: company });
  } catch (err) {
    return res.status(400).json({ error_msg: err.message });
  }
};

const getLoggedInCompanysAction = async (req, res) => {
  try {
    const companys = await getSingleCompanyService({
      _id: req.companys._id
    });
    return res.status(200).json({ data: companys });
  } catch (err) {
    return res.status(400).json({ error_msg: err.message });
  }
};

const editCompanysAction = async (req, res) => {
  try {
    handleValidation(req.body, res, 'editCompany');
    const { token } = req.body;
    const company = await getAndEditCompany({ token }, req.body);
    return res.json({ data: company });
  } catch (err) {
    return res.status(400).json({ error_msg: err.message });
  }
};

const deleteCompanyAction = async (req, res) => {
  try {
    const company = await getSingleCompanyService({ _id: req.params.id });
    console.log('🚀 company', company);

    const deleteForms = await Forms.remove({ token: company.token });

    console.log('🚀  deleteForms', deleteForms);
    await company.remove();
    return res.status(200).json({ data: 'Success' });
  } catch (err) {
    console.log('🚀 ', err);
    return res.status(400).json({ error_msg: err.message });
  }
};

module.exports = {
  getAllCompanysAction,
  getAllActiveCompanysAction,
  getLoggedInCompanysAction,
  getSingleCompanysAction,
  editCompanysAction,
  getEditCompanyAction,
  deleteCompanyAction,
  newCompanyAction
};
