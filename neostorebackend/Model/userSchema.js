const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    fname:{type:String},
    lname:{type:String},
    email:{type:String,unique:true},
    pass:{type:String},
    mobile:{type:Number},
    gender:{type:String},
    profile:{type:String},
    Address:[
        {Address_id:{type:Number},address:{type:String},pincode:{type:Number},city:{type:String},state:{type:String},country:{type:String}}
    ],
    social:{type:Boolean,required:true}
    

})

module.exports=mongoose.model("User",userSchema);