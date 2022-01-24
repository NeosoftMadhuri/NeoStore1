const express = require('express')
const colorModel = require('../Model/colorSchema')
const categoryModel=require('../Model/categorySchema')
getColor = async function ({}) {

    try {
        var color = await colorModel.find({})
        return color;
    } catch (e) {
        // Log Errors
        throw Error('Error while Fetching Color')
    }
}

 getCategory= async function({}) {
    try {
        var category = await categoryModel.find({})
        return category;
    } catch (e) {
        // Log Errors
        throw Error('Error while Fetching Categories')
    }
  
 }

 module.exports={getColor,getCategory}