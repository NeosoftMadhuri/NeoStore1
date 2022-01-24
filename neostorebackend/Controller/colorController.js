const express = require('express')
const colorModel = require('../Model/colorSchema')
var ColorService=require('../Services/services')

exports.getColor = async function (req, res, next) {  
    try {
        var colors = await ColorService.getColor({})
        return res.status(200).json({ status: 200, color: colors, message: "Succesfully Users Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
// const getColor = async (req, res) => {
    
//     await colorModel.find({}, (err, data) => {
//         if (err) {
//             console.log(err)
//             res.json({ "err": 1, "msg": "Some went Wrong" })
//         }
//         else {
//             res.json({ "err": 0, color: data, "status": 200 })
//         }
//     })
// }
// module.exports = { getColor }

