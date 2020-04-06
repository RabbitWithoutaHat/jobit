const { Router } = require('express')
const Review = require('../models/Review')
const Company = require('../models/Company')

const auth = require('../middleware/auth.middleware')

const router = Router()

// add review
router.post('/', auth, async (req, res) => {
  console.log(req.body)
  const { name, description, address, latLng, ...rest } = req.body
  console.log('rest', rest)
  console.log('Object.keys(rest).length', Object.keys(rest).length)
  try {
    const company = new Company({
      name,
      description,
      address,
      latLng,
    })
    await company.save()
    if (Object.keys(rest).length) {
      const review = new Review({
        ...rest,
      })
      await review.save()
    }
    res.status(200).json({ message: 'Отзыв сохранен' })
  } catch (error) {
    res.status(500).json({
      message: 'Не удалось сохранить новый Отзыв',
      error,
    })
  }
})

// all reviews
router.get('/', auth, async (req, res) => {
  try {
    const reviews = await Review.find()
    res.json(reviews)
  } catch (error) {
    res.status(500).json({
      message: 'Не удалось получить отзывы',
    })
  }
})

// review
router.get('/:id', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
    res.json(review)
  } catch (error) {
    res.status(500).json({
      message: 'Не удалось получить отзыв',
    })
  }
})

module.exports = router
