const { Router } = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')

const router = Router()

router.post(
  '/register',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальный длана пароля 8 символов').isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные',
        })
      }

      const { email, password } = req.body
      const candidate = await User.findOne({
        email,
      })
      if (candidate) {
        return res.status(400).json({
          message: 'Данный email уже занят',
        })
      }
      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({
        email,
        password: hashedPassword,
      })
      await user.save()
      res.status(201).json({
        message: 'Пользователь создан',
      })
    } catch (error) {
      res.status(500).json({
        message: 'Ощибка авторизации',
      })
    }
  },
)

router.post(
  '/login',
  [
    check('email', 'Введите корректный email')
      .normalizeEmail()
      .isEmail(),
    check('password', 'Введите пароль').exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные',
        })
      }

      const { email, password } = req.body
      const user = await User.findOne({
        email,
      })
      if (!user) {
        return res.status(400).json({
          message: 'Пользователь не существует',
        })
      }
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({
          message: 'Неверный пароль или email',
        })
      }
      const token = jwt.sign(
        {
          userId: user.id,
        },
        config.get('jwtSecret'),
        {
          expiresIn: '10d',
        },
      )
      res.json({
        token,
        userId: user.id,
      })
    } catch (error) {
      res.status(500).json({
        message: 'Ошибка Авторизации',
      })
    }
  },
)

module.exports = router
