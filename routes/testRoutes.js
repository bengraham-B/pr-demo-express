const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json({msg: "Docker server is working on port 8016"})
})

module.exports = router 