const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const jwtSecrete = "asd889asdas5656asdas887";
const categoryModel=require('../Model/categorySchema')
// const categoryModel=require('../Model/categorySchema1')

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

router.get("/categorydata" ,(req,res)=>{
    console.log("fetch category route")
    categoryModel.find({},(err,data)=>{
        if(err)
        {
            console.log(err)
            res.json({"err":1,"msg":"Some went Wrong"})
        }
        else
        {
            res.json({ "err":0,category:data ,"status":200})
        }
    })
})
module.exports=router;