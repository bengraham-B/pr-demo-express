const express = require('express')

const { testAuthController } = require('../controllers/testAuth')

const router = express.Router()

router.post('/auth', testAuthController)

module.exports = router
