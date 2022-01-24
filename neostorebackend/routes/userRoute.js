const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
const jwtSecrete = "asd889asdas5656asdas887";
const userModel = require('../Model/userSchema')
const colorModel = require('../Model/colorSchema')
const categoryModel = require('../Model/categorySchema')
const productModel = require('../Model/productSchema')
const bcrypt = require('bcrypt')
const saltRounds = 10;
const multer = require('multer')
const helper = require('../helpers/helper')
const path = require('path');
const { profileData, updateProfile, changePass, addAddress,editAddress, deleteAddress, Upload, sendEmail,sendOrderEmail, recoverPass, Login, socialLogin, Register } = require('../Controller/userController');

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
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'C:/training doc/All/NeoStore/neostore/public/Images')

    },
    filename: (req, file, cb) => {
        const filename = file.fieldname + "-" + Date.now() + path.extname(file.originalname);
        cb(null, filename)
    }
})
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            req.fileValidationError = "Forbidden extension"
            cb(null, false, req.fileValidationError);
        }
    }
});

router.post("/register", Register)
router.post("/sociallogin",socialLogin)
router.post("/login", Login);
router.post("/recoverpass", recoverPass);
router.post('/profiledata', autenticateToken,profileData);
router.post("/updateprofile", autenticateToken, updateProfile);
router.post('/changepass', autenticateToken,changePass);
router.post("/addaddress", autenticateToken,addAddress);
router.post("/editaddress", autenticateToken,editAddress);
router.post("/deleteaddress", autenticateToken,deleteAddress);
router.post("/uploadlogo", upload.single('file'),Upload);
router.post('/sendmail', sendEmail);
router.post('/sendOrderMail',sendOrderEmail);


//REGISTER ROUTE
// router.post("/register", (req, res) => {
//     let b_pass = req.body.password;
//     const hash = bcrypt.hashSync(b_pass, saltRounds);
//     let fname = req.body.fname;
//     let lname = req.body.lname;
//     let email = req.body.email;
//     let pass = hash;
//     let mobile = req.body.mobile;
//     let gender = req.body.gender;
//     let ins = new userModel({ fname: fname, lname: lname, email: email, pass: pass, mobile: mobile, gender: gender, social: false });
//     ins.save((err) => {
//         if (err) {
//             res.json({ "err": 1, 'msg': `${email}  was registered already` })

//         }
//         else {
//             res.json({ "err": 0, "success": true, "status code": 200, 'msg': `${fname} ${lname} was registered successfully` })
//         }
//     })
// })

//Social Login
// router.post("/sociallogin", (req, res) => {
//     userModel.find({ email: req.body.email }, (err, data) => {
//         console.log(data)
//         if (err) {
//             res.json({ "err": 1, "msg": "Email or password is not correct" })
//         }
//         else if (!data[0]) {
//             console.log("Data not found")
//             let email = req.body.email;
//             let fname = req.body.firstName;
//             let lname = req.body.lastName;
//             let profile = req.body.profilePicURL;
//             let ins = new userModel({ fname: fname, lname: lname, email: email, social: true, profile: req.body.profilePicURL });
//             ins.save((err, data) => {
//                 if (err) {
//                     res.json({ "err": 1, 'msg': `${email}  was registered already` })
//                 }
//                 else {
//                     let payload = {
//                         uid: data
//                     }
//                     const token = jwt.sign(payload, jwtSecrete, { expiresIn: 360000 })
//                     // res.json({ "err": 0, "msg": "Login Success", "token": token })
//                     res.json({ "err": 0, "success": true, "status code": 200, "token": token, 'msg': `${fname} ${lname} was registered successfully` })
//                 }
//             })
//         }
//         else {
//             if (data[0].social == true) {

//                 let payload = {
//                     uid: data
//                 }
//                 console.log(payload)
//                 const token = jwt.sign(payload, jwtSecrete, { expiresIn: 360000 })
//                 res.json({ "err": 0, "success": true, "status code": 200, "token": token, 'msg': `${data[0].fname} ${data[0].lname} login successfully` })
//             }
//             else {
//                 res.json({ "err": 1, "success": false, "status code": 500, 'msg': " Login with Password" })

//             }
//         }

//     })

// })

//LOGIN ROUTE
// router.post("/login", (req, res) => {
//     let email = req.body.email;
//     console.log(email)
//     let password = req.body.password;
//     userModel.find({ email: email }, (err, data) => {
//         console.log(data)
//         if (err) {
//             res.json({ "err": 1, "msg": "Email or password is not correct" })
//         }
//         else if (data[0] != null) {
//             console.log("data their")
//             if (data[0].social == false) {
//                 console.log("socialfalse")
//                 if (bcrypt.compareSync(password, data[0].pass)) {
//                     console.log("match")
//                     let payload = {
//                         uid: data
//                     }
//                     const token = jwt.sign(payload, jwtSecrete, { expiresIn: 360000 })
//                     res.json({ "err": 0, "msg": "Login Success", "token": token })

//                 }
//                 else {
//                     console.log("not match")
//                     res.json({ "err": 1, "msg": "Password Not Match" })
//                 }
//             }

//             else if (data[0].social == true) {
//                 console.log("social true")
//                 res.json({ "err": 1, "msg": "Use remote login" })

//             }

//         }

//         else {
//             res.json({ "err": 1, "msg": "User Not Found , Check Login Credential again" })

//         }

//     })

// })

//Recover Password
// router.post("/recoverpass", (req, res) => {
//     console.log(req.body)
//     let email = req.body.email;
//     console.log(email)
//     let b_pass = req.body.password;
//     const hash = bcrypt.hashSync(b_pass, saltRounds);
//     let pass = hash;
//     userModel.updateOne({ email: email }, { $set: { pass: pass } }, (err) => {
//         if (err) {
//             res.json({ 'err': 1, "msg": "Password Not Recovered. Try ones again" })
//         }
//         else {
//             res.json({ "err": 0, "msg": "Status updated successfully" });
//         }
//     })
// })

//fetch Profile

// router.post('/profiledata', autenticateToken, (req, res) => {
//     console.log(req.body)
//     let id = req.body.id;
//     userModel.find({ _id: id }, (err, data) => {
//         if (err) res.json({ 'err': err })
//         console.log(data)
//         res.json({ profile: data })
//     })

// })


//change password
// router.post('/changepass', autenticateToken, (req, res) => {
//     console.log("changepass")
//     console.log(req.body)
//     let email = req.body.email;
//     let oldpass = req.body.oldpass;
//     let npass = req.body.npass;
//     userModel.find({ id: req.body.id }, (err, data) => {
//         if (err) {
//             res.json({ "err": 1, "msg": "Email Not Found" })
//         }
//         else if (bcrypt.compareSync(oldpass, data[0].pass)) {
//             console.log("match")

//             const npass1 = bcrypt.hashSync(npass, saltRounds);

//             userModel.updateOne({ email: email }, { $set: { pass: npass1 } }, (err, data) => {
//                 if (err) {
//                     res.json({ "err": 1, "msg": "Something Wrong" })
//                 }
//                 else {
//                     console.log("updated")
//                     res.json({ "err": 0, "success": true, "status code": 200, 'msg': "Password updated successfully" })
//                 }
//             })
//         }
//     })


// })

//update Profile

// router.post("/updateprofile", autenticateToken, (req, res) => {
//     console.log(req.body)
//     let email = req.body.email;
//     let fname = req.body.fname;
//     let lname = req.body.lname;
//     let mobile = req.body.mobile;


//     userModel.updateOne({ email: email }, { $set: { fname: fname, lname: lname, mobile: mobile } }, (err) => {
//         if (err) {
//             res.json({ 'err': 1, "msg": "Update Error" })
//         }
//         else {
//             res.json({ "err": 0, "msg": "Profile updated successfully" });
//         }
//     })
// })

//add address
// router.post("/addaddress", autenticateToken, (req, res) => {
//     console.log("address section")
//     console.log(req.body)
//     userModel.find({ _id: req.body.id }, (err, data) => {
//         if (err) {
//             res.json({ err: 1, 'msg': "Unable to Add Address" })
//         }
//         else {
//             let email = req.body.email;
//             let address = req.body.address;
//             let pincode = req.body.pincode;
//             let city = req.body.city;
//             let state = req.body.state;
//             let country = req.body.country;
//             let update = req.body.update;
//             let addressData = { Address_id: Math.random(), address: address, pincode: pincode, city: city, state: state, country: country }
//             console.log(addressData)
//             data[0].Address.push(addressData)
//             console.log(data)
//             userModel.updateOne({ _id: req.body.id }, { $set: { Address: data[0].Address } }, (err, data) => {
//                 if (err) {
//                     res.json({ 'err': 1, "msg": "Address Not Added" })
//                 }
//                 else {
//                     res.json({ "err": 0, "msg": "Address added successfully", user_details: data });
//                 }
//             })
//         }
//     })
// })

//edit address
// router.post("/editaddress", (req, res) => {
//     console.log("address edit section")
//     console.log(req.body)
//     userModel.updateMany({}, { $set: { "Address.$[elem].address": req.body.address, "Address.$[elem].pincode": req.body.pincode, "Address.$[elem].city": req.body.city, "Address.$[elem].state": req.body.state, "Address.$[elem].country": req.body.country } }, { arrayFilters: [{ "elem.Address_id": req.body.Address_id }] }, (err, data) => {
//         if (err) {
//             console.log(err);
//             res.json({ err: 1, 'msg': "unable to Update address" })
//         }
//         else {

//             userModel.find({ _id: req.body.id }, (err, data) => {
//                 if (!data[0]) {
//                     console.log('inside email not found');
//                     res.json({ err: 1, "msg": "Unable to genrate jwt" })
//                 }
//                 else {
//                     let payload = { uid: data }
//                     const token = jwt.sign(payload, jwtSecrete, { expiresIn: 360 })
//                     res.status(200).json({ "err": 0, "msg": "Address Updated Successfully", "token": token })
//                 }
//             })
//         }
//     })
// })

//delete address
// router.post("/deleteaddress", autenticateToken, (req, res) => {
//     console.log("address delete section")
//     console.log(req.body.addr.Address_id)
//     let email = req.params.email;
//     let address_id = req.body.addr.Address_id;

//     userModel.find({ _id: req.body.id }, (err, data) => {
//         if (err) {
//             res.json({ err: 1, 'msg': "Unable to delete Address" })
//         }
//         else {
//             userModel.updateOne({ _id: req.body.id }, { $pull: { Address: { Address_id: address_id } } }, (err) => {
//                 if (err) {
//                     res.json({ 'err': 1, "msg": err })
//                 }
//                 else {
//                     res.json({ "err": 0, "msg": "Address deleted successfully" });
//                 }
//             })
//         }
//     })
// })

//upload image
// router.post("/uploadlogo", upload.single('file'), (req, res) => {
//     console.log("upload")
//     let email = req.body.email;
//     userModel.updateOne({ email: email }, { $set: { profile: req.file.filename } }, (err) => {
//         if (err) {
//             res.json({ 'err': 1, "msg": "File Was Not uploaded" })
//         }
//         else {
//             res.json({ "err": 0, status: 200, "msg": "File Was  uploaded successfully" });
//         }
//     })
// })

//Send OTP

// router.post('/sendmail', (req, res) => {
//     console.log(req.body.email)
//     var val = Math.floor(1000 + Math.random() * 9000);
//     console.log(val);
//     var transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'sandagemadhuri@gmail.com',
//             pass: 'Madhuri@13s'
//         }
//     });

//     var mailOptions = {
//         from:'sandagemadhuri@gmail.com' ,
//         to: `${req.body.email}`,
//         subject: 'OTP',
//         text:
//             `
//          Your One-Time Password (OTP) is ${val}.

//          This OTP is to be used for the login on NeoStore Portal, as requested on 2021-12-23, at 09:19 and it is valid till 09:49.

//          Regards
//          Thank You!`


//     };

//     transporter.sendMail(mailOptions, function (error, info) {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log('Email sent: ' + info.response);
//         }
//     });
//     res.send({ "OTP": val })

// })

// router.post('/sendOrderMail', (req, res) => {
//     var transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'sandagemadhuri@gmail.com',
//             pass: 'Madhuri@13s'
//         }
//     });

//     var mailOptions = {
//         from: `${req.body.email}`,
//         to: 'sandagemadhuri@gmail.com',
//         subject: 'Order Placed Successfully',
//         html: `" 
//         <!DOCTYPE html>
//         <html>
        
//         <head>
//             <title></title>
//             <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
//             <meta name="viewport" content="width=device-width, initial-scale=1">
//             <meta http-equiv="X-UA-Compatible" content="IE=edge" />
//             <style type="text/css">
//                 body,
//                 table,
//                 td,
//                 a {
//                     -webkit-text-size-adjust: 100%;
//                     -ms-text-size-adjust: 100%;
//                 }
        
//                 table,
//                 td {
//                     mso-table-lspace: 0pt;
//                     mso-table-rspace: 0pt;
//                 }
        
//                 img {
//                     -ms-interpolation-mode: bicubic;
//                 }
        
//                 img {
//                     border: 0;
//                     height: auto;
//                     line-height: 100%;
//                     outline: none;
//                     text-decoration: none;
//                 }
        
//                 table {
//                     border-collapse: collapse !important;
//                 }
        
//                 body {
//                     height: 100% !important;
//                     margin: 0 !important;
//                     padding: 0 !important;
//                     width: 100% !important;
//                 }
        
//                 a[x-apple-data-detectors] {
//                     color: inherit !important;
//                     text-decoration: none !important;
//                     font-size: inherit !important;
//                     font-family: inherit !important;
//                     font-weight: inherit !important;
//                     line-height: inherit !important;
//                 }
        
//                 @media screen and (max-width: 480px) {
//                     .mobile-hide {
//                         display: none !important;
//                     }
        
//                     .mobile-center {
//                         text-align: center !important;
//                     }
//                 }
        
//                 div[style*="margin: 16px 0;"] {
//                     margin: 0 !important;
//                 }
//             </style>
        
//         <body style="margin: 0 !important; padding: 0 !important; background-color: "#84c0e3";" bgcolor="#84c0e3">
//             <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Open Sans, Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
//                 For what reason would it be advisable for me to think about business content? That might be little bit risky to have crew member like them.
//             </div>
//             <table border="0" cellpadding="0" cellspacing="0" width="100%">
//                 <tr>
//                     <td align="center" style="background-color: #eeeeee;" bgcolor="#eeeeee">
//                         <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
//                             <tr>
//                                 <td align="center" valign="top" style="font-size:0; padding: 35px;" bgcolor="#F44336">
//                                     <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;">
//                                         <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
//                                             <tr>
//                                                 <td align="left" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; line-height: 48px;" class="mobile-center">
//                                                     <h1 style="font-size: 36px; font-weight: 800; margin: 0; color: #ffffff;">Neo<spanstyle="color:"red">Store</span></h1>
//                                                 </td>
//                                             </tr>
//                                         </table>
//                                     </div>
//                                     <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;" class="mobile-hide">
//                                         <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
//                                             <tr>
//                                                 <td align="right" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; line-height: 48px;">
//                                                     <table cellspacing="0" cellpadding="0" border="0" align="right">
//                                                         <tr>
//                                                             <td style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400;">
//                                                                 <p style="font-size: 18px; font-weight: 400; margin: 0; color: #ffffff;"><a href="#" target="_blank" style="color: #ffffff; text-decoration: none;">Shop &nbsp;</a></p>
//                                                             </td>
//                                                             <td style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 24px;"> <a href="#" target="_blank" style="color: #ffffff; text-decoration: none;"><img src="https://img.icons8.com/color/48/000000/small-business.png" width="27" height="23" style="display: block; border: 0px;" /></a> </td>
//                                                         </tr>
//                                                     </table>
//                                                 </td>
//                                             </tr>
//                                         </table>
//                                     </div>
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td align="center" style="padding: 35px 35px 20px 35px; background-color: #ffffff;" bgcolor="#ffffff">
//                                     <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
//                                         <tr>
//                                             <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;"> <img src="https://img.icons8.com/carbon-copy/100/000000/checked-checkbox.png" width="125" height="120" style="display: block; border: 0px;" /><br>
//                                                 <h2 style="font-size: 30px; font-weight: 800; line-height: 36px; color: #333333; margin: 0;"> Thank You For Your Order! </h2>
//                                             </td>
//                                         </tr>
//                                         <tr>
//                                             <td align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 10px;">
//                                                 <p style="font-size: 16px; font-weight: 400; line-height: 24px; color: #777777;"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium iste ipsa numquam odio dolores, nam. </p>
//                                             </td>
//                                         </tr>
//                                         <tr>
//                                             <td align="left" style="padding-top: 20px;">
//                                                 <table cellspacing="0" cellpadding="0" border="0" width="100%">
//                                                     <tr>
//                                                         <td width="75%" align="left" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;"> Order Confirmation  </td>
//                                                         <td width="25%" align="left" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">  </td>
//                                                     </tr>
//                                                     <tr>
//                                                         <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;"> Purchased Item (${req.body.product.data.length}) </td>
//                                                         <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">  </td>
//                                                     </tr>
//                                                     <tr>
//                                                         <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;"> Shipping + Handling </td>
//                                                         <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">  </td>
//                                                     </tr>
//                                                     <tr>
//                                                         <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;"> Sales Tax </td>
//                                                         <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;"> $5.00 </td>
//                                                     </tr>
//                                                 </table>
//                                             </td>
//                                         </tr>
//                                         <tr>
//                                             <td align="left" style="padding-top: 20px;">
//                                                 <table cellspacing="0" cellpadding="0" border="0" width="100%">
//                                                     <tr>
//                                                         <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;"> TOTAL </td>
//                                                         <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;"> $115.00 </td>
//                                                     </tr>
//                                                 </table>
//                                             </td>
//                                         </tr>
//                                     </table>
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td align="center" height="100%" valign="top" width="100%" style="padding: 0 35px 35px 35px; background-color: #ffffff;" bgcolor="#ffffff">
//                                     <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:660px;">
//                                         <tr>
//                                             <td align="center" valign="top" style="font-size:0;">
//                                                 <div style="display:inline-block; max-width:50%; min-width:240px; vertical-align:top; width:100%;">
//                                                     <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
//                                                         <tr>
//                                                             <td align="left" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
//                                                                 <p style="font-weight: 800;">Delivery Address</p>
//                                                                 <p>${req.body.addr.address},${req.body.addr.pincode},${req.body.addr.city}}</p>
//                                                             </td>
//                                                         </tr>
//                                                     </table>
//                                                 </div>
//                                                 <div style="display:inline-block; max-width:50%; min-width:240px; vertical-align:top; width:100%;">
//                                                     <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
//                                                         <tr>
//                                                             <td align="left" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
//                                                                 <p style="font-weight: 800;">Estimated Delivery Date</p>
//                                                                 <p>January 1st, 2016</p>
//                                                             </td>
//                                                         </tr>
//                                                     </table>
//                                                 </div>
//                                             </td>
//                                         </tr>
//                                     </table>
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td align="center" style=" padding: 35px; background-color: #ff7361;" bgcolor="#1b9ba3">
//                                     <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
//                                         <tr>
//                                             <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;">
//                                                 <h2 style="font-size: 24px; font-weight: 800; line-height: 30px; color: #ffffff; margin: 0;"> Get 30% off your next order. </h2>
//                                             </td>
//                                         </tr>
//                                         <tr>
//                                             <td align="center" style="padding: 25px 0 15px 0;">
//                                                 <table border="0" cellspacing="0" cellpadding="0">
//                                                     <tr>
//                                                         <td align="center" style="border-radius: 5px;" bgcolor="#66b3b7"> <a href="#" target="_blank" style="font-size: 18px; font-family: Open Sans, Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; border-radius: 5px; background-color: #F44336; padding: 15px 30px; border: 1px solid #F44336; display: block;">Shop Again</a> </td>
//                                                     </tr>
//                                                 </table>
//                                             </td>
//                                         </tr>
//                                     </table>
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td align="center" style="padding: 35px; background-color: #ffffff;" bgcolor="#ffffff">
//                                     <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
//                                         <tr>
//                                             <td align="center"> <img src="logo-footer.png" width="37" height="37" style="display: block; border: 0px;" /> </td>
//                                         </tr>
//                                         <tr>
//                                             <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 24px; padding: 5px 0 10px 0;">
//                                                 <p style="font-size: 14px; font-weight: 800; line-height: 18px; color: #333333;"> 675 Parko Avenue<br> LA, CA 02232 </p>
//                                             </td>
//                                         </tr>
//                                         <tr>
//                                             <td align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 24px;">
//                                                 <p style="font-size: 14px; font-weight: 400; line-height: 20px; color: #777777;"> If you didn't create an account using this email address, please ignore this email or <a href="#" target="_blank" style="color: #777777;">unsusbscribe</a>. </p>
//                                             </td>
//                                         </tr>
//                                     </table>
//                                 </td>
//                             </tr>
//                         </table>
//                     </td>
//                 </tr>
//             </table>
//         </body>
        
//         </html>"`



//     };

//     transporter.sendMail(mailOptions, function (error, info) {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log('Email sent: ' + info.response);
//         }
//     });
//     res.send({ "OTP": "Mail Sent" })

// })

module.exports = router;