const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const jwtSecrete = "asd889asdas5656asdas887";
const colorModel=require('../Model/colorSchema')

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

router.get("/colordata" ,(req,res)=>{
    console.log("fetch color route")
    colorModel.find({},(err,data)=>{
        if(err)
        {
            console.log(err)
            res.json({"err":1,"msg":"Some went Wrong"})
        }
        else
        {
            res.json({ "err":0,color:data ,"status":200})
        }
    })
})
module.exports=router;