const Forms = require('../models/Forms');

const getAllForms101InCompany = async (query) => {
  try {
    const forms = await Forms.find(query);
    return forms;
  } catch (err) {
    throw Error(err);
  }
};

const getAllFormsaService = async (query) => {
  try {
    const forms = await Forms.find({}, { date: 1, token: 1, _id: 0 });

    return forms;
  } catch (err) {
    throw Error(err);
  }
};

module.exports = {
  getAllForms101InCompany,
  getAllFormsaService
};
