const express = require('express')
const productModel = require('../Model/productSchema')

    getProduct = async function ({}) {
        try {
            var product = await productModel.find().populate(["category_id","color_id"])
            return product;
        } catch (e) {
            // Log Errors
            throw Error('Error while Fetching Color')
        }
    }


    sortedProduct=async function({},category_id,color_id){
        console.log(color_id)
        try{
           await productModel.find()
            .populate(["category_id","color_id"])
            .then(product=>{
            if(category_id!==''&&color_id=='')
            {
                let filterData=product.filter(pro=>pro.category_id.category_id==category_id);
                console.log(filterData)
                return sorted_Data=filterData
               
            }
            else if(category_id==''&&color_id!=='')
            {
             let filterData=product.filter(pro=>pro.color_id.color_id==color_id)
             return sorted_Data=filterData
          
         
            }else
            {
             let filterData=product.filter(pro=>pro.color_id.color_id==color_id && pro.category_id.category_id==category_id);
             return sorted_Data=filterData
           
            }
         })
         return sorted_Data
       
        }
        catch (e) {
            // Log Errors
            throw Error('Error while Fetching Color')
        }
    }

    updateRating=async function({query}){
        try{
            var rating=await productModel.updateOne({query})
              return rating
        }
        catch (e) {
            // Log Errors
            throw Error('Error while Fetching Color')
        }
    }

 getSingleItem=async function({},id){
        try{
            var product=await productModel.find({_id:id}).populate(["category_id","color_id"])
            return product           
        }
        catch (e) {
            // Log Errors
            throw Error('Error while Fetching Color')
        }

    }



module.exports={getProduct,sortedProduct,updateRating,getSingleItem}

