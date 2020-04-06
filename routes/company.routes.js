const { Router } = require('express')
const Company = require('../models/Company')

const auth = require('../middleware/auth.middleware')

const router = Router()

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
    const companies = await Company.find()
    res.json(companies)
  } catch (error) {
    res.status(500).json({
      message: 'Компании не найдены',
    })
  }
})

router.get('/search/:name', auth, async (req, res) => {
  const regex = new RegExp(req.params.name, 'i')
  const query = Company.find({ name: regex }).limit(4)
  query.exec((err, companies) => {
    if (!err) {
      res.status(200).json({
        companies,
      })
    } else {
      res.status(404).json({
        error: err,
      })
    }
  })
})

// company
router.get('/:id', auth, async (req, res) => {
  try {
    const company = await Company.findById(req.params.id)
    res.json(company)
  } catch (error) {
    res.status(500).json({
      message: 'Компания не найдена',
    })
  }
})

module.exports = router
