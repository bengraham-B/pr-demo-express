//^ tHIS FUNCTION TAJES THE REQUEST paramter used in controller functions
/*
 * This function takes the request paramater in contoller function, 
 * uses the authorization header to get the JWT token.
 * The token is verified and the decoded object is returned.
 */
const {verifyToken} = require('../functions/verifyToken');
const logger = require("../logger")



const adminStatusMiddleware = async (req, res, next) => {
    try {
        const verifyToken_ = verifyToken(req);

        logger.info("Admin Token verified:", `${verifyToken_}`, "- adminStatus.js")

        if (verifyToken_.admin) {
            next();
        } else {
            return res.status(400).json({ message: "User does not have admin permissions" });
        }

    } catch (error) {
        logger.error(error, "Middleware - AdminStatus.js")
        return res.status(400).json({ message: error });
    }
};

module.exports = { adminStatusMiddleware };
