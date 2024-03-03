const fetch = import('node-fetch').then(module => module.default)
const pool = require('../database') //^ Database:Postgres config file
const logger = require('../logger')

//^ This function will retive the latest PR number from that the user generated and send it 
//^     to the frontend which will be sent to the excel (flask) server which will be used to
//^     generate the PR file with that number inserted in.
const downloadExcelFile = async (req, res) => {
    const body = req.body
    console.log(body)

    try {
        //& Get the latest PR number from the database to prevent the user from downloading old PR's1
        const query = `SELECT * FROM rrs_pr_number WHERE employee_name='${body.userName}' ORDER BY pr_number DESC LIMIT 1 ` 
        const db_result = await pool.query(query)
        const db_rows = db_result.rows

        //^ This makes sure that the user has a PR that they are able to download
        if(db_rows.length > 0){
            try {
                logger.info("Begin of func: downloadExcelFile")
                return res.status(200).json({pr_number:db_rows[0].pr_number})
                
            } catch (error) {
                logger.error("Download excelfile, catch error section", error)
                return res.status(400).json({link: "na"})
            }
        }
        //^ This returns a successful response and indicates that the user does not have an PR's which can be downloaded
        else {
            logger.info(`User Does not have any PRs`)
            return res.status(200).json({link: "na", message: "na"})
        }
        
    } catch (error) {
        logger.error(`[downloadExcelFile.js] Error Downloading excel doc: ${error.message}`)
        return res.status(400).json({link: "", message: "User Does not have any PRs"})
    }
}

module.exports = {downloadExcelFile}