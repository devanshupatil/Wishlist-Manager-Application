const mongoose = require('mongoose');
const dotenv = require('dotenv');

// load env configuration
dotenv.config();

const connectDB = async()=> {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI,{
      
        })

        console.log("Connected to MongoDB");
    }
    catch(err){
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;
