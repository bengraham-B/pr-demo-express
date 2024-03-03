require('dotenv').config()
const { decryptAuthFunc } = require('../functions/DecryptFunc')
const pool = require("../database") //^ Database config file
const { query } = require('express')
const logger = require("../logger")
const jwt = require('jsonwebtoken')
const  { createToken } = require('../functions/tokenFunc')


const testAuthController = async (req, res) => {
    logger.info("Test Auth Controller")
    console.log("Test Auth Controller")

    
    const { encryptedData } = req.body

    try {
        //^ Decrypts the auth info
        const { decryptedUserName, decryptedPassword } = decryptAuthFunc(encryptedData)
        console.log("Decrypted info for test Auth", decryptedUserName, decryptedPassword)
    
        //& Checks the database for auth status
        const query = "SELECT * FROM test_auth"
        const db_result = await pool.query(query)
        const users = db_result.rows
        console.log(users)
    
        for (let i = 0; i < users.length; i++){
            if(users[i].user_name = decryptedUserName){
                const token = await createToken(decryptedUserName,decryptedPassword)
                const adminStatus = jwt.verify(token, process.env.SECRET) //^ Checking the auth status of the token once its created.
                logger.info(`Test Auth Login: ${decryptedUserName}`)
                return res.status(200).json({userName: decryptedUserName, admin: true, token: token})
            }
        }
    
        return res.status(400).json({message: "Not Authenticated"})
        
    } catch (error) {
        logger.info("DDD")
        return res.status(400).json({message: error.message})
        
    }







    
    



}
module.exports = {testAuthController}