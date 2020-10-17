import React from 'react'
import { Button } from 'react-bootstrap'
import {useMutation,gql} from '@apollo/client'

const DELETE_PRODUCT = gql`
    mutation deleteProduct($productID: String!){
        deleteProduct(productID: $productID)
    }
`

export default function ProductItem(props) {
    const [deleteProduct] = useMutation(DELETE_PRODUCT, {
        update(cache, { data: { deleteProduct } }) {
            cache.modify({
                fields: {
                    products(existingProducts = []) {
                        let updatedProducts = existingProducts.filter(product => !product.__ref.includes(props.product._id));
                        return updatedProducts;
                    }
                }
            });
        }
    });

    const handleDeleteProduct = () => {
        deleteProduct({variables:{
            productID: props.product._id
        }})
    }

    return (
        <div className="p-1 col-lg-3 col-sm-4 col-xm-6">
            <div className="product-box">
                <h5>{props.product.name}</h5>
                <p>Brand: {props.product.brand}</p>
                <p>Category: {props.product.category.categoryName}</p>
                <p>Price: {props.product.price}</p>
                <p>{props.product.details}</p>
                <div className="row">
                    <Button className="col-6" variant="outline-secondary" onClick={() => props.switchToEdit(props.product)}>Edit</Button>
                    <Button className="col-6" variant="outline-danger" onClick={handleDeleteProduct}>Delete</Button>
                </div>
            </div>
        </div>
    )
}