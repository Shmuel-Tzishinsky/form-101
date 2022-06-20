const {
  getAllForms101InCompany,
  getAllFormsaService
} = require('../services/form.services.js');

const { registerCompanyValidation } = require('../utils/validation');

const validation = {
  editCompany: registerCompanyValidation
};

const handleValidation = (body, res, type) => {
  const { error } = validation[type](body);

  if (error) {
    throw Error(error.details[0].message);
  }
};

const getAllFormsInCompany = async (req, res) => {
  try {
    const totalForms = await getAllForms101InCompany({
      token: req.body.data
    });

    return res.status(200).json({ data: totalForms });
  } catch (err) {
    return res.status(400).json({ error_msg: err.message });
  }
};

const getAllForms = async (req, res) => {
  try {
    const totalForms = await getAllFormsaService({
      token: req.body.data
    });

    return res.status(200).json({ data: totalForms });
  } catch (err) {
    return res.status(400).json({ error_msg: err.message });
  }
};

module.exports = {
  getAllFormsInCompany,
  getAllForms
};
