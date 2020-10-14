
import React, { Component } from 'react'
import ProductItem from './ProductItem';
import { serverURL } from '../../Constants';
import { Button,FormLabel,FormControl } from 'react-bootstrap';

export default class ProductSection extends Component {
    defaultEditingProduct = {
        name: "",
        brand: "",
        details: "",
        price: "",
        category: {
            _id:"",
            categoryName: ""
        },
    };

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            products: [],
            categories: [],
            createMode: false,
            editingProductIndex: null,
            editingProduct: this.defaultEditingProduct
        }
    }

    componentDidMount() {
        this.fetchProducts();
    }

    switchCreateMode = (event) => {
        if(this.state.createMode) {
            this.setState({createMode: false});
        }
        else {
            if(!this.state.categories.length) {
                this.fetchCategories();
            }
            this.setState({createMode: true});
        }
    }

    render() {
        if(this.state.loading)
            return (<div className='text-center p-5'>
                    <span className="spinner-border spinner-border-lg" role="status" aria-hidden="true"></span>
                </div>)
        
        return (
            <div  id='product-section'>
                <div className='row'>
                    <div className='col-8'>
                        <h1>Products</h1>
                    </div>
                    {!this.state.createMode && <div className='col-4'>
                        <Button variant="outline-success" style={{width: '100%'}} onClick={this.switchCreateMode}>Add Product</Button>
                    </div>}
                </div>
                {this.state.createMode && <div className="row mb-5">
                    <div className="col-md-4 p-1">
                        <FormLabel>Product Name*</FormLabel>
                        <FormControl type='text' onChange={(event) => this.handleFieldChange("name",event)} value={this.state.editingProduct.name}/>
                    </div>
                    <div className="col-md-4 p-1">
                        <FormLabel>Brand*</FormLabel>
                        <FormControl type='text' onChange={(event) => this.handleFieldChange("brand",event)} value={this.state.editingProduct.brand}/>
                    </div>
                    <div className="col-md-4 p-1">
                        <FormLabel>Details*</FormLabel>
                        <FormControl type='text' onChange={(event) => this.handleFieldChange("details",event)} value={this.state.editingProduct.details}/>
                    </div>
                    <div className="col-md-4 p-1">
                        <FormLabel>Price*</FormLabel>
                        <FormControl type='text' onChange={(event) => this.handleFieldChange("price",event)} value={this.state.editingProduct.price}/>
                    </div>
                    <div className="col-md-4 p-1">
                        <FormLabel>Category*</FormLabel>
                        <FormControl as="select" onChange={(event) => this.handleFieldChange("category",event)} value={this.state.editingProduct.category._id}>
                        <option>{this.state.editingProduct.category.categoryName}</option>
                            {
                                this.state.categories.map(category => (<option value={category._id} key={category._id}>{category.categoryName}</option>))
                            }
                        </FormControl>
                    </div>
                    
                    <div className="col-md-4 p-1">
                    <FormLabel className="col-12 text-danger">* Required Fields</FormLabel>
                        <div className="row">
                            <div className="col-6">
                                <Button variant="success" style={{width: '100%'}} onClick={this.handleProductRequest}>Save</Button>
                            </div>
                            <div className="col-6">
                                <Button variant="danger" style={{width: '100%'}} onClick={this.switchCreateMode}>Cancel</Button>
                            </div>
                        </div>
                    </div>
                </div>}
                <div className='row'>
                {
                    this.state.products.map((product,index) => {
                        return (<ProductItem key={product._id} product={product} productIndex={index} handleEditProduct={this.handleEditProduct} handleDeleteProduct={this.handleDeleteProduct}/>);
                    })
                }
                </div>
            </div>
        )
    }

    handleFieldChange = (key,event) => {
        let editedDate = {...this.state.editingProduct};
        if(key === "category") {
            editedDate[key] = {_id: event.target.value,categoryName: ""};
        }
        else {
            editedDate[key] = event.target.value;
        }

        this.setState({editingProduct:editedDate});
    }

    handleEditProduct = (productIndex) => {
        if(!this.state.categories.length) {
            this.fetchCategories();
        }
        let editingProduct = this.state.products[productIndex];
        this.setState({createMode: true,editingProductIndex: productIndex,editingProduct: editingProduct});
    }

    handleDeleteProduct = (productID) => {
        let reqBody = {
            query: `
                mutation {
                    deleteProduct(productID: "${productID}")
                }
            `
        }

        this.setState({loading: true},() => {
            fetch(serverURL, {
                method: 'POST',
                body: JSON.stringify(reqBody),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                if(res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed to Fetch Data!');
                }
    
                return res.json();
            })
            .then(resData => {
                let updatedProducts = this.state.products.filter(p => p._id !== productID);
                this.setState({products: updatedProducts,loading:false});
            })
            .catch(err => console.log(err));
        });
    }

    handleProductRequest = () => {
        console.log(this.state.editingProductIndex);
        if(this.state.editingProductIndex !== null)
            this.updateProduct();
        else
            this.addProduct();
    }

    updateProduct = () => {
        let name = this.state.editingProduct.name;
        let brand = this.state.editingProduct.brand;
        let details = this.state.editingProduct.details;
        let price = this.state.editingProduct.price;
        let productID = this.state.editingProduct._id;
        let category = this.state.editingProduct.category._id;

        let reqBody = {
            query: `
                mutation {
                    updateProduct(productID: "${productID}",productInput:{name: "${name}",brand: "${brand}",details:"${details}",price:${price},categoryID:"${category}"}) {
                        _id
                        name
                        brand
                        price
                        details
                        category{
                            _id
                            categoryName
                        }
                    }
                }
            `
        }

        this.setState({loading: true},() => {
            fetch(serverURL, {
                method: 'POST',
                body: JSON.stringify(reqBody),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                if(res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed to Fetch Data!');
                }
    
                return res.json();
            })
            .then(resData => {
                console.log("updated Date");
                console.log(resData);
                let updatedProducts = [...this.state.products];
                updatedProducts[this.state.editingProductIndex] = resData.data.updateProduct;
                this.setState({products: updatedProducts,loading:false,createMode: false,editingProductIndex: null,editingProduct: this.defaultEditingProduct});
            })
            .catch(err => console.log(err));
        });
    }

    addProduct = () => {
        let name = this.state.editingProduct.name;
        let brand = this.state.editingProduct.brand;
        let details = this.state.editingProduct.details;
        let price = this.state.editingProduct.price;
        let category = this.state.editingProduct.category._id;

        let reqBody = {
            query: `
                mutation {
                    addProduct(productInput:{name: "${name}",brand: "${brand}",details:"${details}",price:${price},categoryID:"${category}"}) {
                    _id
                    name
                    brand
                    price
                    details
                    category{
                        _id
                        categoryName
                    }
                    }
                }
            `
        }

        this.setState({loading: true},() => {
            fetch(serverURL, {
                method: 'POST',
                body: JSON.stringify(reqBody),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                if(res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed to Fetch Data!');
                }
    
                return res.json();
            })
            .then(resData => {
                console.log("added Date");
                console.log(resData);
                let updatedProducts = [...this.state.products];
                updatedProducts.push(resData.data.addProduct);
                this.setState({products: updatedProducts,loading:false,createMode: false});
            })
            .catch(err => console.log(err));
        });
    }

    fetchCategories = () => {
        const reqBody = {
            query: `
                query {
                    categories {
                        _id
                        categoryName
                        numberOfProducts
                    }
                }
            `
        }
        this.setState({loading:true},() => {
            fetch(serverURL, {
                method: 'POST',
                body: JSON.stringify(reqBody),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                if(res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed to Fetch Data!');
                }
    
                return res.json();
            })
            .then(resData => {
    
                this.setState({categories: resData.data.categories,loading:false});
            })
            .catch(err => console.log(err));
        });
    }

    fetchProducts = () => {
        let reqBody = {
            query: `
                query {
                    products {
                        _id
                        name
                        brand
                        price
                        details
                        category {
                            _id
                            categoryName
                        }
                     }
                }
            `
        }
        fetch(serverURL, {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if(res.status !== 200 && res.status !== 201) {
                throw new Error('Failed to Fetch Data!');
            }

            return res.json();
        })
        .then(resData => {

            this.setState({products: resData.data.products,loading:false});
        })
        .catch(err => console.log(err));
    }
}