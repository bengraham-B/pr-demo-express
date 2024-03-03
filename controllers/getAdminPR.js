const jwt = require('jsonwebtoken')
const pool = require('../database') //^ Database config file

const getAdminPr = async (req, res) => {
    const {authorization } = req.headers
    const {userEmail} = req.body

    if(!authorization){
        logger.error("No Auth token recevied by server")
        return res.status(401).json({msg: "No Auth Token"})
    }

    const Usertoken = authorization.split(' ')[1]
    const { token } = req.body
    

    //^ This verifys that token in header and body are both admin.
    const verifyToken = jwt.verify(token, process.env.SECRET)
    const verifyUserToken = jwt.verify(Usertoken, process.env.SECRET)

    try {
        //^ If both are admin it will allow the request
        if(verifyToken.admin && verifyUserToken.admin){
            const query = `SELECT * FROM rrs_pr_numbers`
            const purchaseReqs = await pool.query(query)

            const queryAdmin = `SELECT * FROM admin_user`;
            const queryResponseAdmin = await pool.query(queryAdmin)
            const userArrayAdmin = queryResponseAdmin.rows

            try {
                if(userArrayAdmin[i].admin_email === userEmail){

                    const token = createJwtTokenAdmin(userArrayAdmin[i].id)

                    logger.info("Response: All Pr's to admin user")
        
                    return res.status(200).json({
                        admin: userArrayAdmin[i].admin_email, 
                        purchaseReqs: purchaseReqs.rows
                    })
                }

                
            } catch (err) {
                logger.error(err.message)
                return res.status(404).json({msg: "No Employee Found"}) 
            }
        }

        else{
            logger.error(err.message)
            return res.status(400).json({error: "Not Admin User"})
        }

    } catch (err) {
        logger.error(err.message)
        return res.status(400).json({error:  "Not Admin User"})
    }


}

module.exports = {getAdminPr}