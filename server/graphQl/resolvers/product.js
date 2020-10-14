
const productModel = require('../../models/productModel');
const categoryModel = require('../../models/categoryModel');

const getProducts = async (categoryID) => {
    try {
        let query = {};
        if(categoryID) {
            query = {category: categoryID}
        }
        let products = await productModel.find(query).populate('category');
        if(!products) {
            throw new Error("Product collection is not created yet");
        }

        return products;
    }
    catch(err) {
        throw err;
    }
}

const addProduct = async (productInput) => {
    try {
        let category = await categoryModel.findById(productInput.categoryID);
        if(!category) {
            throw new Error('This Category does not exist');
        }

        let newProduct = new productModel({
            name: productInput.name,
            brand: productInput.brand,
            details: productInput.details,
            image: productInput.image,
            price: productInput.price,
            category: productInput.categoryID
        })

        category.numberOfProducts += 1;
        await category.save();

        let result = await newProduct.save();
        result.category = category;
        return result;
    }
    catch(err) {
        throw err;
    }
}

const deleteProduct = async (productID) => {
    try {
        let result = await productModel.findByIdAndDelete(productID);
        if(!result) {
            throw new Error("Can not delete the product");
        }
    }
    catch(err) {
        throw err;
    }
}

const updateProduct = async (productID,productInput) => {
    try {
        let category = await categoryModel.findById(productInput.categoryID);
        if(!category) {
            throw new Error('This Category does not exist');
        }

        let product = await productModel.findById(productID);
        if(!product) {
            throw new Error("Product Not found");
        }

        product.name = productInput.name,
        product.brand = productInput.brand,
        product.details = productInput.details,
        product.image = productInput.image,
        product.price = productInput.price,
        product.category = productInput.categoryID

        let result = await product.save();
        result.category = category;
        return result;
    }
    catch(err) {
        throw err;
    }
}

module.exports = {
    getProducts: getProducts,
    addProduct: addProduct,
    deleteProduct: deleteProduct,
    updateProduct: updateProduct
}