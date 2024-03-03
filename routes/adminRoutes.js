const express = require('express')
const router = express.Router()

const { adminGetAllPr, adminSearch, verifyAdminStatus } = require('../controllers/adminController')
const { adminStatusMiddleware } = require('../middleware/adminStatus')

// router.use(adminStatusMiddleware) //^ This is the middleware which verifies the user's admin status

router.post('/dirc', verifyAdminStatus)

router.post('/', adminGetAllPr)

router.post('/search', adminSearch)

module.exports = router