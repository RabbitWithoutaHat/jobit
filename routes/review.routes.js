const { Router } = require('express');
const Review = require('../models/Review');
const auth = require('../middleware/auth.middleware');

const router = Router();

// add review
// router.post('/', auth, async (req, res) => {
//   try {
//     const {
//       company, date, text, rate,
//     } = req.body;
//   } catch (error) {
//     res.status(500).json({
//       message: 'error',
//     });
//   }
// });

// all reviews
router.get('/', auth, async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({
      message: 'error',
    });
  }
});

// review
router.get('/:id', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    res.json(review);
  } catch (error) {
    res.status(500).json({
      message: 'error',
    });
  }
});

module.exports = router;
