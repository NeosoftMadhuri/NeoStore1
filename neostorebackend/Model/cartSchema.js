const mongoose=require('mongoose');
const cartSchema=new mongoose.Schema({
    customer_id:{type:String,require:true},
    product_id:{type:mongoose.Schema.Types.ObjectId,
        ref:"Product"},
        product_name:{type:String,required:true},
    quantity:{type:Number,required:true},
    product_cost:{type:Number,required:true},
    total_productCost:{type:Number,required:true},  
    checkout:{type:Boolean,required:true},
    customer_address:{type:String},
      created_at:{type:Date,default:Date.now()}
})
module.exports=mongoose.model("Cart",cartSchema);