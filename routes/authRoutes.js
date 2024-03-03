const express = require('express')

//^ Importing Controller functions
const { authAD } = require('../controllers/authAD')
const { authMac } = require('../controllers/authMac')

const router = express.Router()

router.post('/ad', authAD) //^ Using Active Directory to login in user

module.exports = router 