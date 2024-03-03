const pool = require('../database') //^ Database:Postgres config file
const { verifyToken } = require('../functions/verifyToken')
const logger = require('../logger')

//^ This function gets all the PR's which will be displayed on the home page
async function adminGetAllPr(req, res){
    const verifyToken_ = verifyToken(req)

    try {
        //^ This verifies ther admin status before getting all the PR's
        if(verifyToken_.admin){
            const query = "SELECT * FROM rrs_pr_number ORDER BY pr_number DESC"
            const allPr = await pool.query(query)
            logger.info(`Admin Page: ${verifyToken_.userName} SELECTED * PRs`)
            res.status(200).json({prs:allPr.rows})
        }
    
        else {
            logger.warn(`Admin Page: Not admin`)
            res.status(400).json({message: "Not admin"})
        }
        
    } catch (err) {
        logger.warn(`Admin Page: ${err.message}`)
        res.status(400).json({error: err.message})
    }
}

//^ This function is responsible for executing the searches
async function adminSearch(req, res){
    const { search } = req.body
    try {    
        //^ If the admin sends an empt search they receive all PRs
        if (search === "" || search === undefined ){
            const query = "SELECT * FROM rrs_pr_number ORDER BY pr_number DESC"
            logger.info(`Admin Page - Search all PR`)
            const allPr = await pool.query(query)
            return res.status(200).json({searchResult:allPr.rows})
        }

        else {        
                
            try {
                //^ The SQL query which will search all the columns of the database for the search phrase the admin Provided
                const query = `
                    SELECT * FROM rrs_pr_number WHERE 
                    CAST (pr_number AS text) LIKE $1 OR
                    CAST (employee_name AS text) LIKE $1 OR
                    CAST (supplier AS text) LIKE $1  OR
                    CAST (project_code AS text) LIKE $1 OR
                    CAST (date_ AS text) LIKE $1 
                    ORDER BY pr_number DESC
                ; `

                const queryParam = [`%${search}%`] //^ Search query provided by admin user

                pool.query(query, queryParam, (err, results) => {
                    try {
                        if(err){ //^c: If an error occured during the search
                            logger.error("Error in executing Admin search",err.message);
                            return res.status(400).json({error: err.message})
                        }
    
                        else { //^c: If the search was successful.
                            logger.info(`Admin Page - Search: [${search}] `)
                            return res.status(200).json({searchResult: results.rows})// Process the results
                        }
                    } catch (err) {
                        logger.error(`Admin Page - Search ${err} `)
                        res.status(500).json({error: err.message})
                    }
                })
                
            } catch (err) {
                logger.error(`Admin Page - Search ${err} `)
                return res.status(400).json({error: err})
            }
        }

    } catch (error) {
        logger.error(`Admin Page - Search ${err} `)
        res.status(400).json({error: error})

    }
        
}

//& This function will verify the Admin token obtained by the frontend
async function verifyAdminStatus(req, res){
    const token_ = await verifyToken(req)
    res.status(200).json({token: token_})
}


module.exports = { adminGetAllPr, adminSearch, verifyAdminStatus }