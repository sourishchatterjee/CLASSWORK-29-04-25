const mongoose= require('mongoose');

const connectDB = async()=>{
    try {
       await mongoose.connect(process.env.MONGODB_URL)
        console.log("databas connect successfully")
    } catch (error) {

        console.log("sorry unable to connect",error )
        
    }
};

module.exports = connectDB;