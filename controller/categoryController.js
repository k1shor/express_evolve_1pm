const CategoryModel = require("../model/categoryModel")

// insert into DB
exports.addCategory = async (req, res) => {
    // let categoryObj = new CategoryModel({
    //     category_name: req.body.category_name
    // })

    // categoryObj = await categoryObj.save()
    let category = await CategoryModel.findOne({
        category_name: req.body.category_name
    })
    /*
category.category_name = req.body.category_name
category = await category.save()

    */

    if (category) {
        return res.status(400).json({ error: "category already exists" })
    }

    let categoryObj = await CategoryModel.create({
        category_name: req.body.category_name
    })
    if (!categoryObj) {
        // error
        return res.status(400).json({ error: "Something went wrong" })
    }
    // success
    res.send(categoryObj)



    // CategoryModel.create({})
    // .then(categoryObje=>{
    //     if(!categoryObje){
    //         // error
    //     }
    //     else{
    //         // success
    //     }
    // })
}



// to get all categories
exports.getAllCategories = async (req, res) => {
    let categories = await CategoryModel.find()
    if (!categories) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(categories)
}

// to get category details
exports.getCategoryDetails = async (req, res) => {
    let category = await CategoryModel.findById(req.params.id)
    if (!category) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(category)
}

// update category
exports.updateCategory = async (req, res) => {
    try {
        let categoryToUpdate = await CategoryModel.findByIdAndUpdate(req.params.id, {
            category_name: req.body.category_name
        }, { new: true })
        if (!categoryToUpdate) {
            return res.status(400).json({ error: "Failed to Update" })
        }
        res.send(categoryToUpdate)
    }
    catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

// delete category
// exports.deleteCategory = (req, res) => {
//     CategoryModel.findByIdAndDelete(req.params.id)
//     .then(deletedCategory=>{
//         if(!deletedCategory){
//             return res.status(400).json({error:"Category Not found"})
//         }
//         res.send({message:"Category Deleted Successfully"})
//     })
//     .catch(err=>res.status(400).json({error:err.message}))
// }
exports.deleteCategory = async (req, res) => {
    try {
        let deletedCategory = await CategoryModel.findByIdAndDelete(req.params.id)
        if (!deletedCategory) {
            return res.status(400).json({ error: "Category Not found" })
        }
        res.send({ message: "Category Deleted Successfully" })

    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
}


/*

req.body -> receive data from user using form 
req.params -> receive data using url
req.query -> receive data from url using variables


res.send(obj) -> 200 / OK
res.status(status_code).send(obj)
        status_code: 
            404 : not found
            400 : bad request
            200 - 300 : success
            500 - 600 : server error

res.status(status_code).json(obj)


Model.find() -> returns all the data in the Model -> array
Model.find(filterObj) -> returns all data that satisfies the filterObj ->array

Model.findOne(filterObj) -> returns first data that satisfies the filterObj ->{}

Model.findById(id) -> returns the data/row that has the given id ->{}

*/