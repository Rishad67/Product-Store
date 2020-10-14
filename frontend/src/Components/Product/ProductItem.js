import React from 'react'
import { Button } from 'react-bootstrap'

export default function ProductItem(props) {
    return (
        <div className="product-box mb-1 col-lg-3 col-sm-4 col-xm-6">
            <h5>{props.product.name}</h5>
            <p>Brand: {props.product.brand}</p>
            <p>Category: {props.product.category.categoryName}</p>
            <p>Price: {props.product.price}</p>
            <p>{props.product.details}</p>
            <div className="row">
                <Button className="col-6" variant="outline-secondary" onClick={() => props.handleEditProduct(props.productIndex)}>Edit</Button>
                <Button className="col-6" variant="outline-danger" onClick={() => props.handleDeleteProduct(props.product._id)}>Delete</Button>
            </div>
        </div>
    )
}