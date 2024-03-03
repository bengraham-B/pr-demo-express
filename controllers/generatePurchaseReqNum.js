const pool = require('../database') //^ Database:Postgres config file
const { dateStringFunc } = require('../functions/dateStringFunc')
const logger = require('../logger')

const basePrNumber = 81000

async function getLatestNumber(){
    try {
        const query = 'SELECT * FROM rrs_pr_number ORDER BY id DESC LIMIT 1'
        const latestNumber = await pool.query(query)
        logger.info(`Retrived latest PR number: ${latestNumber.rows[0].pr_number}`)
        return latestNumber.rows[0].pr_number
    } catch (err) {
        logger.error("Could Not get latested number", `Error: ${err.message}`)
    }
}

async function generatePurchaseReqNum(req, res){
    const  {userName, supplier, projectCode, note} = req.body
    console.log(req.body)
    const userNameFromReact = req.body.userName

    try {
        const latestNumber = await getLatestNumber()

        //^ This checks to make sure that there is a base PR Before Generating a new PR
        if (latestNumber){
            const newPrNumber = latestNumber + 1
            const date_ = dateStringFunc(time=false) 
            
            const query = `INSERT INTO  rrs_pr_number ("pr_number", "employee_name", "supplier", "project_code","note", "date_") VALUES ('${newPrNumber}', '${userName}', '${supplier}', '${projectCode}', '${note}', CURRENT_DATE::DATE) RETURNING *`
            const InsertPR = await pool.query(query)
            logger.info(`PR was created: ${newPrNumber}`)
    
            const allPrQuery = pool.query(`SELECT * FROM rrs_pr_number WHERE employee_name='${userNameFromReact}' ORDER BY pr_number DESC;`)
            logger.info("Retrived All user PRs after PR was created")
            return res.status(200).json({data: allPrQuery.rows, generatedNum: newPrNumber, message: "Not base PR Number"})

        }
        
        //^ If there is not a base PR it Will Generate a base PR
        else {            
            const query = `INSERT INTO  rrs_pr_number ("pr_number", "employee_name", "supplier", "project_code","note", "date_") VALUES ('${basePrNumber}', '${userName}', 'INITIAL PR', 'INITIAL PR', 'INITIAL PR', CURRENT_DATE::DATE) RETURNING *`
            const InsertPR = await pool.query(query)
            logger.info(`Generated base PR number: ${basePrNumber}`)
    
            const allPrQuery = pool.query(`SELECT * FROM rrs_pr_number WHERE employee_name='${userNameFromReact}' ORDER BY pr_number DESC;`)
            logger.info("Retrived All user PRs after PR was created")
            return res.status(200).json({data: allPrQuery.rows, generatedNum: "base PR Number", message: "Base"})

        }

        

    } catch (err) {
        logger.error("Could Not Generated PR number", `Error: ${err}`)
        logger.error(err)
        return res.status(400).json({error: err.messge})
    }
}

module.exports = { generatePurchaseReqNum }