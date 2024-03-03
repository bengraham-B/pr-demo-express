require("dotenv").config()
const jwt = require('jsonwebtoken')
const logger = require('../logger')
function verifyToken(req){
    try {
        const {authorization} = req.headers //^ Getting auth from the request headers, to get the JWT token.  
        if(!authorization){
            return false
        }

        const token = authorization.split(' ')[1]
        const Decoded = jwt.verify(token, process.env.SECRET)
        logger.info("Verified JWT token JWT")
        return Decoded

    } catch (error) {
        logger.error("JWT",error)
        return error.message
        
    }
}

module.exports = { verifyToken }