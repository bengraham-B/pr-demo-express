require('dotenv').config()
const jwt = require('jsonwebtoken')
const pool = require('../database') //^ Database config file
const ActiveDirectory = require('activedirectory')
const logger = require("../logger")

const testAuthMiddleware = async (req, res, next) => {
    const {authorization} = req.headers //^ Getting auth from the request headers, to get the JWT token.
    
    if(!authorization){
        return res.status(401).json({msg: "No Auth Token"})
    }

    const token = authorization.split(' ')[1]

    const Decoded = jwt.verify(token, process.env.SECRET)
    console.log("testAuthMiddleWare: ", Decoded)

    if (Decoded){
        return next()
    }

    return next()
}

module.exports = { testAuthMiddleware }