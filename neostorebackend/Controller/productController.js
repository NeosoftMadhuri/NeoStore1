var ProductService=require('../Services/productService')

getProduct = async function (req, res, next) {  
    try {
        var product = await ProductService.getProduct({})
        return res.status(200).json({ status: 200, product: product, message: "Succesfully Product Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

sortedProduct = async function (req, res, next) {  
    let category_id=req.body.category_id;
    let color_id=req.body.color_id;
    try {
        var sorteddata = await ProductService.sortedProduct({},category_id,color_id)
        return res.status(200).json({ status: 200, data: sorteddata, message: "Succesfully Product sorted Retrieved" });
    } catch (e) {
        console.log(e.message)
        return res.status(400).json({ status: 400, message: e.message });
    }
}

updateRating = async function (req, res, next) {  
    try {
        var rating = await ProductService.updateRating({_id:req.body.id},{$set:{product_rating:req.body.product_rating}})
        return res.status(200).json({ status: 200, rating: rating, message: "Succesfully Product Reted" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

getSingleItem = async function (req, res, next) {  
    let id=req.params.id
    console.log(id)
    try {
        var product = await ProductService.getSingleItem({},id)
        return res.status(200).json({ status: 200, product: product, message: "Succesfully Product fetched" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

module.exports={getProduct,sortedProduct,updateRating,getSingleItem}







// const getProduct=async(req,res)=>{
//      await productModel.find()
//     .populate(["category_id","color_id"])
//     .then(product=>{
//         console.log(product);
//         res.json({ "err":0,product:product ,"status":200})
//     })

// }

// const sortedProduct=async(req,res)=>{
//       await productModel.find()
//     .populate(["category_id","color_id"])
//     .then(product=>{
//     if(req.body.category_name!==''&&req.body.color_id=='')
//     {
//         let filterData=product.filter(pro=>pro.category_id.category_id==req.body.category_id);
//         res.json({data:filterData})
//     }
//     else if(req.body.category_id==''&&req.body.color_id!=='')
//     {
//      let filterData=product.filter(pro=>pro.color_id.color_id==req.body.color_id)
//      res.json({data:filterData})
 
//     }else
//     {
//      let filterData=product.filter(pro=>pro.color_id.color_id==req.body.color_id && pro.category_id.category_id==req.body.category_id);
//      res.json({data:filterData})
//     }
//  })
// }

// const updateRating=(req,res)=>{
    
//     try{
//           productModel.updateOne({_id:req.body.id},{$set:{product_rating:req.body.product_rating}},(err,data)=>{
//             if(err){res.json({err:err})}
//             res.json({ "err":0,"msg":"Updated Rating","status":200})
//         })

//     }
//     catch(err)
//     {
//         console.log(err)
//         res.json({"err":1,"msg":"Error"})
//     }
    
// }

// const getSingleItem=async(req,res)=>{
// let id=req.params.id
//  await productModel.find({_id:id})
// .populate(["category_id","color_id"])
// .then(product=>{
//     res.json({ "err":0,product ,"status":200})
// })
// }

// module.exports = { getProduct,sortedProduct,updateRating,getSingleItem}