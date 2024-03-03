const pool = require('../database') //^ Database config file

const excelPrController = async(req, res) => {
    const body = req.body
    try {
        const query = `SELECT * FROM rrs_pr_number WHERE employee_name='${body.userName}' ORDER BY pr_number DESC LIMIT 1 `
        const db_result = await pool.query(query)
        const pr_number = await db_result.rows
        const string = pr_number[0].pr_number
        const prNumber = string
        return res.status(200).json({prNumber: String(prNumber)})
    } catch (error) {
        return res.status(400).json(error)
    }
}

module.exports = { excelPrController }