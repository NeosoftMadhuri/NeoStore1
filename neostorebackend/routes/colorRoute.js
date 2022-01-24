const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const jwtSecrete = "asd889asdas5656asdas887";
const colorModel=require('../Model/colorSchema')
const {getColor}=require('../Controller/colorController')



router.get("/colordata",getColor);



















// router.get("/colordata" ,(req,res)=>{
//     console.log("fetch color route")
//     colorModel.find({},(err,data)=>{
//         if(err)
//         {
//             console.log(err)
//             res.json({"err":1,"msg":"Some went Wrong"})
//         }
//         else
//         {
//             res.json({ "err":0,color:data ,"status":200})
//         }
//     })
// })
module.exports=router;