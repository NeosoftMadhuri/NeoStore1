const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const PORT=9999;
const connectDB=require('./Config/db')
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());


//dbconnection
connectDB()
//end


//Routes

const userRoute=require('./routes/userRoute');
const productRoute=require('./routes/productRoute');
const categoryRoute=require('./routes/categoryRoute');
const colorRoute=require('./routes/colorRoute');
const cartRoute=require('./routes/cartRoute');

//API CALL
app.use("/api/user",userRoute);
app.use("/api/product",productRoute)
app.use("/api/category",categoryRoute)
app.use("/api/color",colorRoute)
app.use("/api/cart",cartRoute)


app.listen(PORT,(err,data)=>{
    if(err)throw err
    console.log(`server running on port :${PORT}`)
})

