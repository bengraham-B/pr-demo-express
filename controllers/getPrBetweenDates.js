const jwt = require('jsonwebtoken')
const pool = require('../database') //^ Database config file
const logger = require("../logger")

function removeTimeFromDate(dateString) {
    // Split the date and time\
    try{
        const [datePart] = dateString.split('T');
        return datePart;
    }
    catch (err){
        console.log(err)
    }
  }


const getPrBetweenDates = async (req, res) => {
    const { beginDate, endDate } = req.body

    const dateWithoutTimeB = removeTimeFromDate(beginDate);
    const dateWithoutTimeD = removeTimeFromDate(endDate);
    console.log(dateWithoutTimeB, dateWithoutTimeD);


    try {
        if(dateWithoutTimeB === dateWithoutTimeD){
            const query = `SELECT * FROM rrs_pr_number WHERE date_='${dateWithoutTimeB}' ORDER BY pr_number DESC;`
            const prBetweenDates = await pool.query(query)
            return res.status(200).json({prsBetweenDates: prBetweenDates.rows})
        }
       
        if(dateWithoutTimeB !== dateWithoutTimeD){
            try {
                
                const query = `SELECT * FROM rrs_pr_number WHERE date_ BETWEEN'${dateWithoutTimeB}' AND '${dateWithoutTimeD}' ORDER BY pr_number DESC;`
                const prBetweenDates = await pool.query(query)
                return res.status(200).json({prsBetweenDates: prBetweenDates.rows})
            } catch (error) {
                return res.status(400).json({error: "Could not find PR's between the specified dates"})
            }
        }
    } catch (error) {
        return res.status(400).json("error")

        
    }

    // res.status(200).json("Works RESPONSE")


}

module.exports = {getPrBetweenDates}