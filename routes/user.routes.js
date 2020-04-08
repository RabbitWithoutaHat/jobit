const { Router } = require('express')
const User = require('../models/User')

const auth = require('../middleware/auth.middleware')

const router = Router()

// router.post('/:id', async (req, res) => {
//   try {

//   } catch (error) {
//     res.status(500).json({
//       message: 'error',
//     });
//   }
// });

router.post('/', async (req, res) => {
  console.log(req.body)
  const { id, ...rest } = req.body
  try {
    const user = await User.findOneAndUpdate({ _id: id }, { $set: { ...rest } })
    res.json(JSON.stringify(user))
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Не удалось сохранить данные',
    })
  }
})

// user
router.get('/', async (req, res) => {
  console.log('GETUSER')

  try {
    const users = await User.findById(req.query)
    res.json(users)
  } catch (error) {
    res.status(500).json({
      message: 'Не удалось получить пользователей',
    })
  }
})

// user
router.get('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.json(user)
  } catch (error) {
    res.status(500).json({
      message: 'Не удалось получить пользователя',
    })
  }
})

module.exports = router
