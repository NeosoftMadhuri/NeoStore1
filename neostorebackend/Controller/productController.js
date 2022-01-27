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







