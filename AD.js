require('dotenv').config()
const ActiveDirectory = require('activedirectory')
const  logger = require("./logger")

function adAuthFunc(userName, password){
    const config = {
        url: "ldap://NODE.LOCAL",
        baseDN: "dc=NODE, dc=LOCAL"
    }
    
    const ad = new ActiveDirectory(config)
    
    const userNameAD = `${userName}@NODE.LOCAL`

    let authStatus
    
    //^ Authenticate
    ad.authenticate(userNameAD, password, (err, auth) => {
        if(err){
            logger.error(err)
        }
    
        if(auth){
            logger.info(auth, "- AD.js")
            console.log("AUTHENTICATED")
            return true
        }
    
        else {
            logger.error("Auth Failed - AD.js")
            return false
        }
    })

}

module.exports = { adAuthFunc }
