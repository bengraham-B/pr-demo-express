require('dotenv').config()
const ActiveDirectory = require('activedirectory')
const pool = require("../database") //^ Database config file
const jwt = require('jsonwebtoken')
const  { createToken } = require('../functions/tokenFunc')
const logger = require('../logger')
const { decryptAuthFunc } = require("../functions/DecryptFunc")

async function authMac(req, res){
    try {
        
        const { encryptedData } = req.body;
        console.log("authMac")
    
    
        const {decryptedUserName} = decryptAuthFunc(encryptedData)
        console.log("decryptedUserName:", decryptedUserName)
    
        const token = await createToken(decryptedUserName); //^ Creating the JWT token once the have been authenticated against Active directory.
        console.log(token)
    
        return res.status(200).json({userName: decryptedUserName, admin: false, token: token});
    } catch (error) {
        return res.status(400).json({message: "not authenticated"});
    }

}

module.exports = {authMac}