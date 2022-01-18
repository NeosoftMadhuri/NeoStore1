const mongoose=require('mongoose')

//dbconnection
const db="mongodb://localhost:27017/Neostore";
const connectDB=async()=>{
    try{
        await mongoose.connect(db,{useNewUrlParser:true});
        console.log("MongoDb connected")
    }
    catch(err){
        console.log(err.message)
    }
}

//end

module.exports=connectDB;