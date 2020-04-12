const { Router } = require('express')
const Review = require('../models/Review')
const Company = require('../models/Company')
const User = require('../models/User')

const auth = require('../middleware/auth.middleware')

const router = Router()

// add review
router.post('/new', auth, async (req, res) => {
  const { name, description, address, placeId, userId, ...rest } = req.body
  try {
    const review = new Review({
      ...rest,
      companyName: name,
    })
    await review.save()

    const company = new Company({
      name,
      description,
      address,
      placeId,
      reviews: [review._id],
    })
    await company.save()

    await User.findOneAndUpdate(
      { _id: userId },
      { $push: { reviews: [review._id] } },
    )

    res.status(200).json({ message: 'Отзыв сохранен', id: review._id })
  } catch (error) {
    res.status(500).json({
      message: 'Не удалось сохранить новый Отзыв',
      error,
    })
  }
})

// update review
router.put('/update', auth, async (req, res) => {
  const {
    _id: id,
    name,
    description,
    address,
    placeId,
    userId,
    companyId,
    ...rest
  } = req.body
  try {
    let review

    if (id) {
      review = await Review.findOneAndUpdate(
        { _id: id },
        { $set: { ...rest, companyName: name } },
      )
    } else {
      review = new Review({
        ...rest,
        companyName: name,
      })
      await review.save()
    }

    await Company.findOneAndUpdate(
      { _id: companyId },
      { $set: { name, description, address, placeId, reviews: [review._id] } },
    )

    await User.findOneAndUpdate(
      { _id: userId },
      { $push: { reviews: [review._id] } },
    )

    res.status(200).json({ message: 'Отзыв сохранен' })
  } catch (error) {
    res.status(500).json({
      message: 'Не удалось сохранить новый Отзыв',
      error,
    })
  }
})

// review by user
router.get('/user/:userId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    const userReviewsId = user.reviews
    const reviews = await Review.find({ _id: { $in: userReviewsId } })
    res.json(reviews)
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: 'Не удалось получить отзыв',
    })
  }
})

// review
router.get('/:id', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
    const company = await Company.findOne({
      reviews: req.params.id,
    })
    res.json({ review, company })
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: 'Не удалось получить отзыв',
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
module.exports = router
