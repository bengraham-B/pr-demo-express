require('dotenv').config()
const ActiveDirectory = require('activedirectory')
const pool = require("../database") //^ Database config file
const jwt = require('jsonwebtoken')
const  { createToken } = require('../functions/tokenFunc')
const logger = require('../logger')
const { decryptAuthFunc } = require("../functions/DecryptFunc")




async function authAD(req, res) {
    const { encryptedData } = req.body;
    
    //^ This function is responsile for decrypting the auth information
    const {decryptedUserName, decryptedPassword} = decryptAuthFunc(encryptedData)
    console.log(decryptedUserName, decryptedPassword)
   


    //^ This is the config file for Active directory and data is stored in the '.env' file.
    const config = {
        url: process.env.AD_URL, //^ For ldaps change url to ldaps
        baseDN: process.env.AD_baseDN,
        port: 636 //^ LDAPS port
    };

    const ad = new ActiveDirectory(config);

    const userNameAD = `${decryptedUserName}@rrs.co.za`;

    //^ Create a Promise to use async/await in the callback function
    const authenticatePromise = () => {
        return new Promise((resolve, reject) => {
            ad.authenticate(userNameAD, decryptedPassword, (err, auth) => {
                if (err) {
                    logger.error(`${err}`)
                    reject(err);
                } else {
                    resolve(auth);
                }
            });
        });
    };


    try {
        const auth = await authenticatePromise();

        logger.info("Authenticated with Active Directory")

        if (auth) {
            //& In the tokenFunc.js file in the functions directory, it will check if a user is an admin.
            const token = await createToken(decryptedUserName, decryptedPassword); //^ Creating the JWT token once the have been authenticated against Active directory.
            const adminStatus = jwt.verify(token, process.env.SECRET) //^ Checking the auth status of the token once its created.
            console.log("Admin JWT:", adminStatus.admin)
            
            //^ This will verify the token and send back the admin status to be used in the frontend, but the admin status is still protected by the JWT token.
            if(adminStatus.admin){
                //^ This returns a JWT token with admin true, this token will be used by Admin users 
                logger.info("Admin Login", decryptedUserName)
                return res.status(200).json({userName: decryptedUserName, admin: true, token: token});
            }

            else {
                //^ This returns a JWT token with admin false, this token will be used by normal users 
                logger.info("User Login", decryptedUserName)
                return res.status(200).json({userName: decryptedUserName, admin: false, token: token});
            }

        } 
        
        else {
            logger.error("User Auth failed")
            return res.status(400).json({message: "Not Authenticated"});
        }

    } catch (error) {
        console.error("Error", error.message);
        logger.error("No user found", error.message)
        return res.status(500).json({message: error.message});
    }
}

module.exports = { authAD }