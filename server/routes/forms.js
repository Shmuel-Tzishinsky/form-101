const router = require('express').Router();

const {
  getAllFormsInCompany,
  getAllForms
} = require('../controllers/formController.js');
const {
  verifiedFunction: ensureAuth,
  checkAdmin
} = require('./verifyJwtToken');

router.post('/get-all-forms-in-company', ensureAuth, getAllFormsInCompany);
router.post('/get-all-forms', ensureAuth, getAllForms);

module.exports = router;
