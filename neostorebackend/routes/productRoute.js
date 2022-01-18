const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const jwtSecrete = "asd889asdas5656asdas887";
const colorModel=require('../Model/colorSchema')
const categoryModel=require('../Model/categorySchema')
// const categoryModel=require('../Model/categorySchema1')
const productModel=require('../Model/productSchema')
const saltRounds = 10;


function autenticateToken(req, res, next) {
   
    const authHeader = req.headers['authorization'];
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token)
    if (token == null) {
        res.json({ "err": 1, "msg": "Token not match" })
    }
    else {
        jwt.verify(token, jwtSecrete, (err, data) => {
            if (err) {
                res.json({ "err": 1, "msg": "Token incorrect" })
            }
            else {
                console.log("Match")
                next();
            }
        })
    }
}

router.get("/productdata",(req,res)=>{
    console.log("fetch product route")

    productModel.find()
    .populate(["category_id","color_id"])
    .then(product=>{
        console.log(product);
        res.json({ "err":0,product:product ,"status":200})
    })
  
})

router.post("/sorteddata", (req,res)=>{
   console.log("sorted Section") 
   console.log(req.body)
   productModel.find()
   .populate(["category_id","color_id"])
   .then(product=>{
       console.log(product);
  
   if(req.body.category_name!==''&&req.body.color_id=='')
   {
       console.log(req.body.category_id)
       let filterData=product.filter(pro=>pro.category_id.category_id==req.body.category_id);
       console.log(filterData)
       res.json({data:filterData})
   }
   else if(req.body.category_id==''&&req.body.color_id!=='')
   {

    let filterData=product.filter(pro=>pro.color_id.color_id==req.body.color_id)
    res.json({data:filterData})

   }else
   {
    let filterData=product.filter(pro=>pro.color_id.color_id==req.body.color_id && pro.category_id.category_id==req.body.category_id);
    res.json({data:filterData})
   }
})
})

router.get("/getsingleitem/:id",(req,res)=>{
    console.log("fetch product route")

    productModel.find({_id:req.params.id})
    .populate(["category_id","color_id"])
    .then(product=>{
        console.log(product);
        res.json({ "err":0,product ,"status":200})
    })
   
})

router.post("/updaterating",(req,res)=>{
    console.log("update Rating");
    console.log(req.body)
    productModel.updateOne({_id:req.body.id},{$set:{product_rating:req.body.product_rating}},(err,data)=>{
        if(err){res.json({err:err})}
        res.json({ "err":0,"msg":"Updating Rating","status":200})

    })
})
module.exports = router;