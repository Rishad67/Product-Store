const productResolver = require('./product');
const categoryResolver = require('./category');
const imageResolver = require('./image');

const Query = {
    categories: async () => {
        return await categoryResolver.getCategories();
    },
    products: async (_,{categoryID}) => {
        return await productResolver.getProducts(categoryID);
    }
}

const Mutation = {
    addProduct: async (_,{productInput}) => {
        return productResolver.addProduct(productInput);
    },
    deleteProduct: async (_,{productID}) => {
        return productResolver.deleteProduct(productID);
    },
    updateProduct: async (_,{productID,productInput}) => {
        return productResolver.updateProduct(productID,productInput);
    },
    addCategory: async (_,{categoryInput}) => {
        return categoryResolver.addCategory(categoryInput);
    },
    deleteCategory: async (_,{categoryID}) => {
        return categoryResolver.deleteCategory(categoryID);
    },
    uploadImage: async (_,{ image }) => {
        return imageResolver.uploadImage(image);
    }
}
module.exports = {Query,Mutation};