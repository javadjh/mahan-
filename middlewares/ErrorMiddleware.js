const winston = require("winston");
module.exports = (error,req,res,next)=>{
    winston.error(error.message,error)
    console.log(error)
    res.status(400).send({"error":error.message})
}
