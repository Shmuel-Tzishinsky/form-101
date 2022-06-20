const router = require('express').Router();

const {
  verifiedFunction: ensureAuth,
  checkAdmin
} = require('./verifyJwtToken');

const {
  getLoggedInUser,
  getAllUsers,
  getAllActiveUsers,
  getSingleUser,
  editUserAction,
  deleteUserAction
} = require('../controllers/userController');

const ConvertIntToMonth = require('../helpers/ConvertIntToMonth');
const User = require('../models/User');
const Company = require('../models/Company');

router.get('/', ensureAuth, getAllUsers);
router.get('/me', ensureAuth, getLoggedInUser);

router.get('/active', ensureAuth, getAllActiveUsers);
router.get('/single/:id', getSingleUser);
router.post('/delete/:id', [ensureAuth, checkAdmin], deleteUserAction);

router.patch('/edit-user', [ensureAuth, checkAdmin], editUserAction);

router.get('/group/group-by-month', ensureAuth, async (req, res) => {
  try {
    const users = await Company.aggregate([
      {
        $group: {
          _id: { month: { $month: '$date' } },
          count: { $sum: 1 }
        }
      }
    ]);

    const response = users.map((user) => ({
      month: ConvertIntToMonth(user._id.month),
      count: user.count
    }));

    return res.json(response);
  } catch (err) {
    return res.status(400).json({ error_msg: err });
  }
});

module.exports = router;
