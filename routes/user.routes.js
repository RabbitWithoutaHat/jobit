const { Router } = require('express');
const User = require('../models/User');

const auth = require('../middleware/auth.middleware');

const router = Router();

// router.post('/:id', async (req, res) => {
//   try {

//   } catch (error) {
//     res.status(500).json({
//       message: 'error',
//     });
//   }
// });

// all users
router.get('/', async (req, res) => {
  console.log('GETUSER');

  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: 'Не удалось получить пользователей',
    });
  }
});

// user
router.get('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: 'Не удалось получить пользователя',
    });
  }
});

module.exports = router;
