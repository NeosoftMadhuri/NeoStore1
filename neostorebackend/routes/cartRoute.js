const express = require('express')
const router = express.Router();
const cartModel = require('../Model/cartSchema')
const {editId,addCart, getCart, getAllCart, getAllOrder, incrementProduct, decrementProduct, deleteCart, placeOrder} =require('../Controller/cartController')

router.post("/editid",editId);
router.post("/addcart",addCart);
router.post("/getcart",getCart);
router.post("/getallcart",getAllCart);
router.post("/getallorder",getAllOrder);
router.post("/incrementproduct",incrementProduct);
router.post("/decrementproduct",decrementProduct);
router.post("/deletecart",deleteCart);
router.post("/placeorder",placeOrder);

















// router.post("/editid", (req, res) => {
//     console.log("edit id")
//     console.log(req.body)
//     cartModel.updateOne({ customer_id: req.body.customer_id }, { $set: { customer_id: req.body.id } }, (err, data) => {
//         if (err) { res.json({ err: err }) }
//         else {
//             res.json({ "err": 0, "msg": "Login Successful" })
//         }
//     })
// })

// router.post("/addcart", (req, res) => {
//     console.log("cart module")
//     console.log(req.body)
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
//         console.log(req.body.data.product_cost)
//         console.log(customer_id)
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
//                 let ins = new cartModel({ customer_id: customer_id, product_id: product_id, product_name: product_name, quantity: pro_quantity, product_cost: product_cost, total_productCost: total_productCost, checkout: checkout })
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
//                 let ins = new cartModel({ customer_id: customer_id, product_id: product_id, product_name: product_name, quantity:quantity, product_cost: product_cost, total_productCost: total_productCost, checkout: checkout })
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
// })

// router.post("/getcart", (req, res) => {
//     console.log("get cart")
//     console.log(req.body)
//     cartModel.find({ customer_id: req.body.id, checkout: false })

//         .then(cart => {
//             console.log(cart.length),
//                 res.status(200).json({ err: 1, count: cart.length })
//         })
// })

// router.post("/getallcart", (req, res) => {
//     console.log("All cart data")
//     console.log(req.body)
//     cartModel.find({ customer_id: req.body.id, checkout: false })
//         .populate(["product_id"])
//         .then(cart => {
//             console.log(cart),
//                 res.status(200).json({ err: 1, data: cart })
//         })
// })

// router.post("/getallorder", (req, res) => {
//     console.log("All cart data")
//     console.log(req.body)
//     cartModel.find({ customer_id: req.body.id, checkout: true })
//         .populate(["product_id"])
//         .then(cart => {
//             console.log(cart),
//                 res.status(200).json({ err: 1, data: cart })
//         })
// })

// router.post("/incrementproduct", (req, res) => {
//     console.log("increment")
//     console.log(req.body)
//     let id = req.body.data._id;
//     console.log(id)
//     let quantity = req.body.data.quantity;
//     let final_quantity = quantity + 1;
//     console.log(final_quantity)
//     let product_cost = req.body.data.product_cost;
//     let total_productCost = final_quantity * product_cost;

//     cartModel.find({ _id: id }, (err, data) => {
//         if (err) { res.json({ err: err }) }
//         else if (data[0].quantity >= 10) {
//             res.json({ msg: "Can not add more 10 qunatity into one cart" })
//         }
//         else {
//             cartModel.updateOne({ _id: id }, { $set: { quantity: final_quantity, total_productCost: total_productCost } }, (err) => {
//                 if (err) {
//                     res.json({ err: err })
//                 }
//                 else {
//                     res.json({ msg: "Increment successfully" });
//                 }
//             })

//         }
//     })

// })

// router.post("/decrementproduct", (req, res) => {
//     console.log("decrement")
//     console.log(req.body)
//     let id = req.body.data._id;
//     console.log(id)
//     let quantity = req.body.data.quantity;
//     let final_quantity = quantity - 1;
//     console.log(final_quantity)
//     let product_cost = req.body.data.product_cost;
//     let total_productCost = final_quantity * product_cost;


//     cartModel.find({ _id: id }, (err, data) => {
//         if (err) { res.json({ err: err }) }
//         else if (data[0].quantity <= 1) {
//             res.json({ msg: "At least one quantity required into cart" })
//         }
//         else {
//             cartModel.updateOne({ _id: id }, { $set: { quantity: final_quantity, total_productCost: total_productCost } }, (err) => {
//                 if (err) {
//                     res.json({ err: err })
//                 }
//                 else {
//                     res.json({ msg: "Decrement successfully" });
//                 }
//             })
//         }
//     })

// })

// router.post("/deletecart", (req, res) => {
//     console.log("delete section")
//     cartModel.deleteOne({ _id: req.body.id }, (err, data) => {
//         if (err) { res.json({ err: err }) }
//         res.json({ "err": 0, "msg": "Item Deleted" })
//     })
// })

// router.post("/placeorder", (req, res) => {
//     console.log("order confirm")
//     console.log(req.body)
//     cartModel.updateMany({ customer_id: req.body.id }, { $set: { checkout: true, customer_address: req.body.customer_address.finalAdd } }, (err, data) => {
//         if (err) {
//             res.json({ err: err })
//         }
//         res.json({ "err": 0, "msg": "Order Placed Successfully" })
//     })
// })
module.exports = router;