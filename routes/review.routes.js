const { Router } = require('express')
const Review = require('../models/Review')
const Company = require('../models/Company')
const User = require('../models/User')

const auth = require('../middleware/auth.middleware')

const router = Router()

function calculateCommonRating(arrayRating) {
  const filteredRating = arrayRating.filter(rating => rating)
  const average = filteredRating.reduce((total, amount, index, array) => {
    // eslint-disable-next-line no-param-reassign
    total += Number(amount)
    if (index === array.length - 1) {
      return total / array.length
    }
    return total
  }, 0)
  return Math.round(average)
}

// add review
router.post('/new', auth, async (req, res) => {
  const {
    name,
    description,
    address,
    placeId,
    userId,
    companyId,
    teamleadRating,
    trainingRating,
    teamRating,
    workplaceRating,
    taskRating,
    login,
    userLogin,
    ...rest
  } = req.body

  const arrayRating = [teamleadRating, trainingRating, teamRating, workplaceRating, taskRating]

  try {
    const review = new Review({
      ...rest,
      companyName: name,
      commonRating: calculateCommonRating(arrayRating),
      teamleadRating,
      trainingRating,
      teamRating,
      workplaceRating,
      taskRating,
      author: userLogin,
    })
    await review.save()

    if (companyId) {
      await Company.findOneAndUpdate(
        { _id: companyId },
        {
          $set: {
            name,
            description,
            address,
            placeId,
          },
          $push: { reviews: [review._id] },
        },
      )
    } else {
      const company = new Company({
        name,
        description,
        address,
        placeId,
        reviews: [review._id],
      })
      await company.save()
    }

    await User.findOneAndUpdate({ _id: userId }, { $push: { reviews: [review._id] } })

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
    teamleadRating,
    trainingRating,
    teamRating,
    workplaceRating,
    taskRating,
    commonRating,
    ...rest
  } = req.body
  try {
    let review

    const arrayRating = [teamleadRating, trainingRating, teamRating, workplaceRating, taskRating]

    if (id) {
      review = await Review.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            ...rest,
            teamleadRating,
            trainingRating,
            teamRating,
            workplaceRating,
            taskRating,
            companyName: name,
            commonRating: calculateCommonRating(arrayRating),
          },
        },
      )
    } else {
      review = new Review({
        ...rest,
        companyName: name,
        commonRating: calculateCommonRating(arrayRating),
        teamleadRating,
        trainingRating,
        teamRating,
        workplaceRating,
        taskRating,
        author: userId,
      })
      await review.save()

      await User.findOneAndUpdate({ _id: userId }, { $push: { reviews: [review._id] } })
    }

    await Company.findOneAndUpdate(
      { _id: companyId },
      {
        $set: {
          name,
          description,
          address,
          placeId,
        },
        $push: { reviews: [review._id] },
      },
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
    const userReviewsIds = user.reviews
    const reviews = await Review.find({ _id: { $in: userReviewsIds } })
    res.json(reviews)
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: 'Не удалось получить отзыв',
    })
  }
})

// last reviews
router.get('/last', auth, async (req, res) => {
  try {
    const reviews = await Review.find().sort({ date: -1 })
    res.json(reviews)
  } catch (error) {
    res.status(500).json({
      message: 'Не удалось получить последние отзывы',
    })
  }
})

// review by company
router.get('/company/:companyId', auth, async (req, res) => {
  try {
    const company = await Company.findById(req.params.companyId)
    const companyReviewsIds = company.reviews
    const reviews = await Review.find({ _id: { $in: companyReviewsIds } })
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
    res.json(review)
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
