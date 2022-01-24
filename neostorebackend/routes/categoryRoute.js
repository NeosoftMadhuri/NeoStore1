const express = require('express')
const router = express.Router();
const {getCategory}=require('../Controller/categoryController')




router.get("/categorydata",getCategory);














// router.get("/categorydata" ,(req,res)=>{
//     console.log("fetch category route")
//     categoryModel.find({},(err,data)=>{
//         if(err)
//         {
//             console.log(err)
//             res.json({"err":1,"msg":"Some went Wrong"})
//         }
//         else
//         {
//             res.json({ "err":0,category:data ,"status":200})
//         }
//     })
// })

module.exports=router;