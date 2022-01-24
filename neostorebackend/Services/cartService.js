const cartModel=require('../Model/cartSchema')

getCart=async function({},customer_id,checkout){
    try{
        var cart=await cartModel.find({customer_id: customer_id, checkout: false})
        return cart           
    }
    catch (e) {
        // Log Errors
        throw Error('Error while Fetching Cart')
    }

}

getAllCart=async function({},customer_id,checkout){
    try{
        var cart=await cartModel.find({customer_id: customer_id, checkout: false}) .populate(["product_id"])
      
        return cart           
    }
    catch (e) {
        // Log Errors
        throw Error('Error while Fetching Cart')
    }

}

getAllOrder=async function({query}){
    try{
        var cart=await cartModel.find({query}).populate(["product_id"])
        console.log(cart)
        return cart           
    }
    catch (e) {
        // Log Errors
        throw Error('Error while Fetching Cart')
    }

}

inc_dec_Product=async function({},id,final_quantity,total_productCost){
    try{
        var cart=await cartModel.updateOne({ _id: id }, { $set: { quantity: final_quantity, total_productCost: total_productCost } })
        return cart           
    }
    catch (e) {
        // Log Errors
        throw Error('Error while Fetching Cart')
    }

}

deleteCart=async function({},id){
    try{
        var cart=await cartModel.deleteOne({_id:id})
        return cart           
    }
    catch (e) {
        // Log Errors
        throw Error('Error while Deleting Cart')
    }

}

placeOrder=async function({},id,checkout,customer_address){
    try{
        var cart=await cartModel.updateMany({ customer_id:id }, { $set: { checkout:checkout, customer_address: customer_address } })
        return cart           
    }
    catch (e) {
        // Log Errors
        throw Error('Error while Deleting Cart')
    }

}

editId=async function({},customer_id,id){
    try{
        var cart=await cartModel.updateOne({ customer_id: customer_id }, { $set: { customer_id:id } })
        return cart           
    }
    catch (e) {
        // Log Errors
        throw Error('Error while Deleting Cart')
    }

}

findCart=async function({},customer_id,checkout,product_name){
    try{
        var cart=await cartModel.find({ customer_id: customer_id, product_name: product_name, checkout: false  })
        console.log(cart)
        return cart           
    }
    catch (e) {
        // Log Errors
        throw Error('Error while Deleting Cart')
    }

}

addCart=async function({},customer_id,checkout,product_name,product_id,pro_quantity,product_cost,total_productCost){
    try{
        let ins = new cartModel({ customer_id: customer_id, product_id: product_id, product_name: product_name, quantity: pro_quantity, product_cost: product_cost, total_productCost: total_productCost, checkout: checkout })
        let cart=await ins.save() 
        return cart           
    }
    catch (e) {
        // Log Errors
        throw Error('Error while Deleting Cart')
    }

}

addCartQty=async function({},customer_id,checkout,product_name,product_id,pro_quantity,product_cost,total_productCost){
    try{
        var cart=await cartModel.updateOne({ customer_id: customer_id, product_id: product_id }, { $inc: { quantity: 1 } })
        return cart           
    }
    catch (e) {
        // Log Errors
        throw Error('Error while Deleting Cart')
    }

}













module.exports={getCart,getAllCart,getAllOrder,inc_dec_Product,deleteCart,placeOrder,editId,findCart,addCart,addCartQty}