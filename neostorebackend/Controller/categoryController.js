
var CategoryService=require('../Services/services')

getCategory = async function (req, res, next) {  
    try {
        var categories = await CategoryService.getCategory({})
        return res.status(200).json({ status: 200, category: categories, message: "Succesfully Users Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
module.exports={getCategory}
