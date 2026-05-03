const express = require('express')
const router = express.Router()

const companyController = require('../controller/companyController')
const auth = require('../shared/auth')

router.get('/fetchForUpdate/:id', auth, companyController.fetchForUpdate)
router.get('/', auth, companyController.getAll)
router.post('/new-company', auth, companyController.newCompany)
router.post('/search', auth, companyController.search)
router.patch('/update/:id', auth, companyController.update)
router.delete('/delete', auth, companyController.delete)

module.exports = router
