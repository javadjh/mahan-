const mongoose = require('mongoose')

const connection = async ()=>{
    const connectDb = await mongoose.connect(process.env.DB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        authSource:'admin'

    })
    if(connectDb)
        console.log("database has running")
}
module.exports = connection()
