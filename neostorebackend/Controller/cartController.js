const express = require('express')
const cartModel = require('../Model/cartSchema');
const { checkout } = require('../routes/cartRoute');
const CartService=require('../Services/cartService')


editId = async function (req, res, next) {  
   let customer_id=req.body.customer_id;
   let id=req.body.id;
    try {
        var cart = await CartService.editId({},customer_id,id)
        return res.status(200).json({ status: 200, count: cart.length, message: "Login Successful" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

getCart = async function (req, res, next) {  
   let customer_id=req.body.id;
   let checkout=false;
    try {
        var cart = await CartService.getCart({},customer_id,checkout)
        return res.status(200).json({ status: 200, count: cart.length, message: "Succesfully Cart Length fetched" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

getAllCart= async function (req, res, next) {  
  let customer_id=req.body.id;
  let checkout=false;
    try {
        var cart = await CartService.getAllCart({},customer_id,checkout)
        return res.status(200).json({ status: 200, data:cart, message: "Succesfully Cart fetched" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

getAllOrder= async function (req, res, next) {  

    try {
        var cart = await CartService.getAllOrder({ customer_id: req.body.id, checkout: true})
        return res.status(200).json({ status: 200, data:cart, message: "Succesfully Cart fetched" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

incrementProduct= async function (req, res, next) {  
    let id = req.body.data._id;
    let quantity = req.body.data.quantity;
    let final_quantity = quantity + 1;
    let product_cost = req.body.data.product_cost;
    let total_productCost = final_quantity * product_cost;
    try {
        var cart = await CartService.getCart({ _id: id})
        if( cart[0].quantity>=10){
            return res.status(200).json({ status: 200, data:cart, message: "Can not add more 10 qunatity into one cart" });
        }
        else
        {
            var cart = await CartService.inc_dec_Product({},id,final_quantity,total_productCost)
            return res.status(200).json({ status: 200, data:cart, message: "Succesfully Cart quantity Incrensed" });
        }
       
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

decrementProduct= async function (req, res, next) {  
    let id = req.body.data._id;
        let quantity = req.body.data.quantity;
        let final_quantity = quantity - 1;
        let product_cost = req.body.data.product_cost;
        let total_productCost = final_quantity * product_cost;
    try {
        var cart = await CartService.getCart({ _id: id})
        if( cart[0].quantity <= 1){
            return res.status(200).json({ status: 200, data:cart, message: "At least one quantity required into cart" });
        }
        else
        {
            var cart = await CartService.inc_dec_Product({},id,final_quantity,total_productCost)
            return res.status(200).json({ status: 200, data:cart, message: "Succesfully Cart quantity Decresed" });
        }
       
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

deleteCart = async function (req, res, next) {  
   let id=req.body.id;
    try {
        var cart = await CartService.deleteCart({},id)
        return res.status(200).json({ status: 200,  message: "Succesfully Cart Item Deleted" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}


placeOrder = async function (req, res, next) {  
    let id=req.body.id;
    let checkout=true;
    let customer_address=req.body.customer_address.finalAdd ;

    try {
        var cart = await CartService.placeOrder({},id,checkout,customer_address)
        return res.status(200).json({ status: 200,  message: "Order Placed Successfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

addCart = async function (req, res, next) {  

    if (req.body.user[0]._id) {
        let customer_id = req.body.user[0]._id;
        console.log(customer_id)
        let product_id = req.body.data._id;
        let product_name = req.body.data.product_name;
        let product_producer = req.body.data.product_producer;
        let product_image = req.body.data.product_image;
        let pro_quantity = 1;
        let product_cost = req.body.data.product_cost;
        let total_productCost = pro_quantity * product_cost;
        let checkout = false;
        try {
            var cart = await CartService.findCart({},customer_id,checkout,product_name)
            if(!cart[0])
            {
                var cart = await CartService.addCart({},customer_id,checkout,product_name,product_id,pro_quantity,product_cost,total_productCost)
                 return res.status(200).json({ status: 200,  message: "Product Added Successfully" });
            }
            else
            {
                var cart = await CartService.addCartQty({},customer_id,checkout,product_name,product_id,pro_quantity,product_cost,total_productCost)
                 return res.status(200).json({ status: 200,  message: "Product Qty Added Successfully" });
            }
            // return res.status(200).json({ status: 200,  message: "Order Placed Successfully" });
        } catch (e) {
            return res.status(400).json({ status: 400, message: e.message });
        }

    }
  
    
}
// addCart = (req, res) => {
//     if (req.body.user[0]._id) {
//         let customer_id = req.body.user[0]._id;
//         let product_id = req.body.data._id;
//         let product_name = req.body.data.product_name;
//         let product_producer = req.body.data.product_producer;
//         let product_image = req.body.data.product_image;
//         let pro_quantity = 1;
//         let product_cost = req.body.data.product_cost;
//         let total_productCost = pro_quantity * product_cost;
//         let checkout = false;
//         cartModel.find({ customer_id: customer_id, product_name: product_name, checkout: false }, (err, data) => {
//             if (data.length > 0) {
//                 cartModel.updateOne({ customer_id: customer_id, product_id: product_id }, { $inc: { quantity: 1 } }, (err, data) => {
//                     if (err) {
//                         res.json({ err: err })
//                     }
//                     else {
//                         res.json({ "err": 0, 'message': "Product Quantity Increased" })
//                     }

//                 })

//             }
//             else {
//                 console.log("add section ")
//                 let ins = new cartModel({ customer_id: customer_id, product_id: product_id, product_name: product_name, quantity: pro_quantity, product_cost: product_cost, total_productCost: total_productCost, checkout: checkout })
//                 ins.save((err) => {
//                     if (err) {
//                         res.json({ err: err })
//                     }
//                     else {
//                         res.json({ "err": 0, "success": true, "status code": 200, 'message': `Product Added Successfully` })
//                     }
//                 })
//             }


//         })
//     }
//     else {
//         let customer_id = req.body.user;
//         let quantity = 1;
//         let product_id = req.body.data._id;
//         let product_name = req.body.data.product_name;
//         let product_cost = req.body.data.product_cost;
//         let total_productCost = quantity * product_cost;
//         let checkout = false;
//         console.log(req.body.data.product_cost)
//         cartModel.find({ customer_id: customer_id, product_name: product_name, checkout: false }, (err, data) => {
//             if (data.length > 0) {
//                 cartModel.updateOne({ customer_id: customer_id, product_id: product_id }, { $inc: { quantity: 1 } }, (err, data) => {
//                     if (err) {
//                         res.json({ err: err })
//                     }
//                     else {
//                         res.json({ "err": 0, 'msg': "Product Quantity Increased" })
//                     }

//                 })

//             }
//             else {
//                 console.log("add section ")
//                 let ins = new cartModel({ customer_id: customer_id, product_id: product_id, product_name: product_name, quantity: quantity, product_cost: product_cost, total_productCost: total_productCost, checkout: checkout })
//                 ins.save((err) => {
//                     if (err) {
//                         res.json({ err: err })
//                         // res.json({ "err": 1, 'msg': "Some went Wrong" })

//                     }
//                     else {
//                         res.json({ "err": 0, "success": true, "status code": 200, 'msg': `Product Added Successfully` })
//                     }
//                 })
//             }


//         })

//     }
// }



module.exports={getCart,getAllCart,getAllOrder,incrementProduct,decrementProduct,deleteCart,placeOrder,editId,addCart}
