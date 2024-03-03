require('dotenv').config()
const express = require('express')
const cors = require('cors')
const logger = require('./logger')
const https = require('https')
const fs = require("fs")
const path = require('path');  // Import the 'path' module


const prRoutes = require('./routes/purchaseReqRoutes')
const authRoutes = require('./routes/authRoutes')
const adminRoutes = require('./routes/adminRoutes')
const testRoutes = require('./routes/testRoutes')
const excelRoute = require('./routes/excelRoute') //* This handles generating the excel Spreadsheet with the PR Number

const testAuthRoutes = require('./routes/testAuthRoutes') //& This routes is used to authenticate user for the sake of testing before release

const app = express()

app.use(express.json())
app.use(cors())
app.use('/python', express.static(path.join(__dirname, 'python')));


app.use("/api/pr", prRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/test/", testRoutes)
app.use("/api/excel/", excelRoute)
app.use('/api/test-auth/', testAuthRoutes)

const PORT_NUMBER = process.env.PORT

app.get("/", (req, res) => {
    res.status(200).json("Server is working")
})

app.get("/test", (req, res) => {
    try {
        logger.info("Tested API")
        res.status(200).json({message: "Works", code: 200})
        
    } catch (error) {
        logger.error("Could not Test API")
        res.status(400).json(error.message)
    }
})

app.listen(PORT_NUMBER, () => {
    logger.info(`Dev Server Running on PORT: ${PORT_NUMBER}`)
})
