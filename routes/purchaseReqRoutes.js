const express = require('express')
const {requireAuth} = require("../middleware/requireAuth")
const { testAuthMiddleware } = require("../middleware/testAuthMiddleWare")

//^ Importing Controller functions
const { getUserPurchaseReq } = require('../controllers/getUserPurchaseReq')
const { getAdminPr } = require('../controllers/getAdminPR')
const { generatePurchaseReqNum} = require('../controllers/generatePurchaseReqNum')
const { getPrBetweenDates } = require("../controllers/getPrBetweenDates")

const router = express.Router()

// router.use(requireAuth) //^ verify user is authenticated when making requests to server
router.use(testAuthMiddleware) //& verify user is authenticated when making requests to server Test

router.post('/', getUserPurchaseReq) //^ Get All purchase requitsions.

router.post('/admin', getAdminPr) //^ The admin will be able to retive all purchase reqs

router.post('/generate-pr-number', generatePurchaseReqNum)

router.post('/pr-between-dates', getPrBetweenDates)

module.exports = router 