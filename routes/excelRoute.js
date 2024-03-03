const express = require('express')
const {excelPrController}  = require('../controllers/excelPrController')
const {testAuthMiddleware} = require('../middleware/testAuthMiddleWare')
const {downloadExcelFile}  = require("../controllers/downloadExcelFile")

const router = express.Router()

router.use(testAuthMiddleware)
router.post('/', excelPrController)
router.post("/download", downloadExcelFile)

module.exports = router