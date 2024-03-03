const pool = require('../database') //^ Database config file
const jwt = require('jsonwebtoken')
const logger = require("../logger")

//^ This function handles sending the PR objects to the frontend.
const getUserPurchaseReq = async (req, res) => {
    const userNameFromReact = req.body.userName
    const {authorization} = req.headers

    try {
        const query = `SELECT * FROM rrs_pr_number WHERE employee_name='${userNameFromReact}' ORDER BY pr_number DESC; `
        const purchaseReqs = await pool.query(query)
        logger.info("Response: all user PR sent to frontend")
        return res.status(200).json({prs:purchaseReqs.rows})
    } catch (err) {
        logger.error(`Error generated getting PR's [getUserPurchaseReq.js]`, err.message)
        res.status(400).json({error: err.message})
    }
}

module.exports = { getUserPurchaseReq }