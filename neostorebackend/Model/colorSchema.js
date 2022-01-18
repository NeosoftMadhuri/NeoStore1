const mongoose=require('mongoose');
const colorSchema=new mongoose.Schema({
    color_name:{type:String,require:true,unique:true},
    color_code:{type:String,required:true},
    color_id:{type:String,required:true},
    created_at:{type:Date,default:Date.now()}
})
module.exports=mongoose.model("Color",colorSchema);