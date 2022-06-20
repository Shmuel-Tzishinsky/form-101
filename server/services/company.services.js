const Company = require('../models/Company');

const getCompany = async (query) => {
  try {
    const company = await Company.findOne(query);
    if (!company || !company.isActive) {
      throw Error('החברה לא נמצאה או לא פעילה');
    }

    return company;
  } catch (err) {
    throw Error('שגיאה: לא נמצאה חברה');
  }
};

const getAndEditCompany = async (query, newData) => {
  try {
    const company = await Company.findOneAndUpdate(query, newData, {
      new: true,
      runValidators: true
    });

    return company;
  } catch (err) {
    throw Error('התרחשה שגיאה');
  }
};

const getSingleCompanyService = async (query) => {
  try {
    const company = await Company.findOne(query);
    return company;
  } catch (err) {
    throw Error('שגיאה: לא נמצאה חברה');
  }
};

const getCompanys = async (query) => {
  try {
    const companys = await Company.find(query);
    return companys;
  } catch (err) {
    throw Error('שגיאה: לא נמצאה חברה');
  }
};

const getActiveCompanys = async (query) => {
  try {
    const company = await Company.find(query);
    return company;
  } catch (err) {
    throw Error('שגיאה: לא נמצאה חברה');
  }
};

module.exports = {
  getCompany,
  getCompanys,
  getActiveCompanys,
  getSingleCompanyService,
  getAndEditCompany
};
