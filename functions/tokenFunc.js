require('dotenv').config()
const jwt = require("jsonwebtoken")
const pool = require("../database") //^ Database config file
const logger = require("../logger")

async function createToken(userName_, password_) {
    try {
        const getAdminUsers =  await pool.query("SELECT * FROM admin_user;")
        const adminUserArray = getAdminUsers.rows
    
        for(let i = 0; i < adminUserArray.length; i++){
            if(userName_ === adminUserArray[i].admin_name){
                logger.info("Admin JWT token made","JWT", userName_)
                return jwt.sign({userName: userName_, password: password_, admin: true}, process.env.SECRET, {expiresIn: '3d'})
            } 
        }
        
        logger.info("User JWT token made", "JWT", userName_)
        return jwt.sign({userName: userName_, password: password_, admin: false}, process.env.SECRET, {expiresIn: '3d'}) 
    } catch (error) {
        logger.error(error)
        return error.message
    }
}

module.exports = { createToken };
