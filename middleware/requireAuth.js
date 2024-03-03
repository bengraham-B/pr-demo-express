//^ This file will be imported in the routes folder and used in purchaseReqRoutes.js
require('dotenv').config()
const jwt = require('jsonwebtoken')
const pool = require('../database') //^ Database config file
const ActiveDirectory = require('activedirectory')
const logger = require("../logger")


const requireAuth = async(req, res, next) => {
    const {authorization} = req.headers //^ Getting auth from the request headers, to get the JWT token.

    if(!authorization){
        return res.status(401).json({msg: "No Auth Token"})
    }

    const token = authorization.split(' ')[1]

    const Decoded = jwt.verify(token, process.env.SECRET)

    try{
        const config = {
            url: process.env.AD_URL,
            baseDN: process.env.AD_baseDN,
        };

        const ad = new ActiveDirectory(config);

        const userNameAD = `${Decoded.userName}@NODE.LOCAL`;

        const authenticatePromise = () => {
            return new Promise((resolve, reject) => {
                ad.authenticate(userNameAD, Decoded.password, (err, auth) => {
                    if(err){
                        reject(err)
                    }

                    else{
                        resolve(auth)
                    }
                })
            })
        }

        try {
            const auth = await authenticatePromise()
            if(auth){
                console.log("Middle Auth Good AD")
                return next()
            }
        } catch (err) {
            logger.error("Auth Failed", err, "Middleware - RequireAuth.js")
            return res.status(400).json({error: err.message, middlewareError: "Action not authorised - RequireAuth.js"});
        }

        next()

    }catch(err){
        logger.error(err, "Middleware - RequireAuth.js")
        res.status(400).json({error: "Request not authorised"})
    }
}

module.exports = {requireAuth}