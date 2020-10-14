const categoryModel = require('../../models/categoryModel');
const productModel = require('../../models/productModel');

const getCategories = async () => {
    try {
        let Categories = await categoryModel.find({}).populate('category');
        if(!Categories) {
            throw new Error("Category collection is not created yet");
        }

        return Categories;
    }
    catch(err) {
        throw err;
    }
}

const addCategory = async (categoryInput) => {
    try {
        let newCategory = new categoryModel({
            categoryName: categoryInput.categoryName
        })

        let result = await newCategory.save();
        return result;
    }
    catch(err) {
        throw err;
    }
}

const deleteCategory = async (categoryID) => {
    try {
        let count = await productModel.count({category: categoryID});
        if(count) {
            throw new Error("This category is attached to some products, can't delete");
        }

        let result = await categoryModel.findByIdAndDelete(categoryID);
        if(!result) {
            throw new Error("Can not delete the product");
        }
    }
    catch(err) {
        throw err;
    }
}

module.exports = {
    addCategory: addCategory,
    deleteCategory: deleteCategory,
    getCategories: getCategories
}