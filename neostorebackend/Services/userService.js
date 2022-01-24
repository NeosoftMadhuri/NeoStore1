const express = require('express')
const userModel = require('../Model/userSchema')
const bcrypt = require('bcrypt')
const saltRounds = 10;

profileData = async function ({},id) {

    try {
        var data = await userModel.find({_id:id})
        return data;
    } catch (e) {
        // Log Errors
        throw Error('Error while Fetching Profile')
    }
}

updateProfile = async function ({},id,fname,lname,mobile) {

    try {
        var data = await userModel.updateOne({ _id:id }, { $set: { fname: fname, lname: lname, mobile: mobile } })
        return data;
    } catch (e) {
        // Log Errors
        throw Error('Error while Fetching Profile')
    }
}

addAddress = async function ({},address,pincode,city,state,country,id) {

    try {
        var data = await userModel.find({ _id:id })
        let addressData = { Address_id: Math.random(), address: address, pincode: pincode, city: city, state: state, country: country }
        data[0].Address.push(addressData)
       var Add_Data= userModel.updateOne({ _id:id }, { $set: { Address: data[0].Address } })
        return Add_Data;
    } catch (e) {
        // Log Errors
        throw Error('Error while Fetching Profile')
    }
}

editAddress = async function ({},address,pincode,city,state,country,id,Address_id) {

    try {
      
       var Add_Data= userModel.updateOne({_id:id}, { $set: { "Address.$[elem].address": address, "Address.$[elem].pincode": pincode, "Address.$[elem].city":city, "Address.$[elem].state":state, "Address.$[elem].country":country } }, { arrayFilters: [{ "elem.Address_id":Address_id }] })
        return Add_Data;
    } catch (e) {
        // Log Errors
        throw Error('Error while Fetching Profile')
    }
}

editAddress = async function ({},address,pincode,city,state,country,id,Address_id) {

    try {
      
       var Add_Data= userModel.updateOne({_id:id}, { $set: { "Address.$[elem].address": address, "Address.$[elem].pincode": pincode, "Address.$[elem].city":city, "Address.$[elem].state":state, "Address.$[elem].country":country } }, { arrayFilters: [{ "elem.Address_id":Address_id }] })
        return Add_Data;
    } catch (e) {
        // Log Errors
        throw Error('Error while Fetching Profile')
    }
}


deleteAddress = async function ({},address_id,id) {

    try {
      
       var Add_Data= userModel.updateOne({ _id:id }, { $pull: { Address: { Address_id: address_id } } })
        return Add_Data;
    } catch (e) {
        // Log Errors
        throw Error('Error while Deleteing  Address')
    }
}

changePass = async function ({},id,oldpass,npass1) {

    try {
      
     var data=await userModel.updateOne({ _id: id }, { $set: { pass: npass1 } })
       return data;
    } catch (e) {
        // Log Errors
        throw Error('Error while changing password')
    }
}
Upload = async function ({},profile,id) {

    try {
      
     var data=await userModel.updateOne({ _id: id }, { profile: profile })
       return data;
    } catch (e) {
        // Log Errors
        throw Error('Error while updating profile pic')
    }
}

recoverPass = async function ({},email,pass) {

    try {
      
     var data=await userModel.updateOne({ email: email }, { $set: { pass: pass } })
       return data;
    } catch (e) {
        // Log Errors
        throw Error('Error while changing password')
    }
}

Login = async function ({},email) {

    try {
      
     var data=await userModel.find({ email: email })
       return data;
    } catch (e) {
        // Log Errors
        throw Error('Error while Login')
    }
}
socialLogin = async function ({},email,fname,lname,profile) {

    try {
            let ins = new userModel({ fname: fname, lname: lname, email: email, social: true, profile: profile });
               await ins.save();
            var data=userModel.find({email:email})
   
       return data;

    } catch (e) {
        // Log Errors
        throw Error('Email is Already There')
    }
}

Register = async function ({},fname,lname,email,pass,mobile,gender) {

    try {
            let ins = new userModel({ fname: fname, lname: lname, email: email, pass: pass, mobile: mobile, gender: gender, social: false });
            var data=await ins.save();
            
   
       return data;

    } catch (e) {
        // Log Errors
        throw Error('Email is Already There')
    }
}










 module.exports={profileData,updateProfile,addAddress,editAddress,deleteAddress,changePass,Upload,recoverPass,Login,socialLogin,Register}