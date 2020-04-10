const bcrypt = require('bcryptjs')
const { Router } = require('express')
const User = require('../models/User')

const auth = require('../middleware/auth.middleware')

const router = Router()

// update user
router.post('/', async (req, res) => {
  const { id, password, ...rest } = req.body
  try {
    let user
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 12)
      user = await User.findOneAndUpdate(
        { _id: id },
        { $set: { ...rest, password: hashedPassword } },
      )
    } else {
      user = await User.findOneAndUpdate({ _id: id }, { $set: { ...rest } })
    }

    res.json(JSON.stringify(user))
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Не удалось сохранить данные',
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
