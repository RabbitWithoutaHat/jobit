const bcrypt = require('bcryptjs')
const { Router } = require('express')
const upload = require('../middleware/upload.middleware')
const auth = require('../middleware/auth.middleware')
const User = require('../models/User')

const router = Router()

// update user
router.post('/', upload, async (req, res) => {
  const { id, form } = req.body
  const formObject = JSON.parse(form)
  const { password, ...rest } = formObject

  try {
    let user
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 12)
      if (req.file) {
        user = await User.findOneAndUpdate(
          { _id: id },
          {
            $set: {
              ...rest,
              password: hashedPassword,
              profileImg: req.file.filename,
            },
          },
        )
      } else {
        user = await User.findOneAndUpdate(
          { _id: id },
          {
            $set: {
              ...rest,
              password: hashedPassword,
            },
          },
        )
      }
    } else if (!password) {
      if (req.file) {
        user = await User.findOneAndUpdate(
          { _id: id },
          { $set: { ...rest, profileImg: req.file.filename } },
        )
      } else {
        user = await User.findOneAndUpdate({ _id: id }, { $set: { ...rest } })
      }
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
