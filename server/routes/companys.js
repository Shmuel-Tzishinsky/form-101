const router = require('express').Router();

const {
  getAllCompanysAction,
  editCompanysAction,
  getEditCompanyAction,
  newCompanyAction,
  deleteCompanyAction
} = require('../controllers/companyController');
const {
  verifiedFunction: ensureAuth,
  checkAdmin
} = require('./verifyJwtToken');

// Routers
router.post('/add-new-company', newCompanyAction);
router.post('/get-company', ensureAuth, getAllCompanysAction);
router.post('/get-edit-company', ensureAuth, getEditCompanyAction);
router.post('/get-unique-company', getEditCompanyAction);
router.delete(
  '/delete-company/:id',
  [ensureAuth, checkAdmin],
  deleteCompanyAction
);
router.patch('/edit-company', ensureAuth, editCompanysAction);

module.exports = router;
[];
