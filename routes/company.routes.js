const { Router } = require('express');
const Company = require('../models/Company');

const auth = require('../middleware/auth.middleware');

const router = Router();

// add company
// router.post('/:id', auth, async (req, res) => {
//   try {
//     const { name, description, location } = req.body;
//   } catch (error) {
//     res.status(500).json({
//       message: 'error',
//     });
//   }
// });

// all companies
router.get('/', auth, async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    res.status(500).json({
      message: 'error',
    });
  }
});

// company
router.get('/:id', auth, async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    res.json(company);
  } catch (error) {
    res.status(500).json({
      message: 'error',
    });
  }
});

module.exports = router;
