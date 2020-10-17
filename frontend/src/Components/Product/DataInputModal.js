import React from 'react'
import { Modal } from 'react-bootstrap'
import DataInputForm from './DataInputForm'

import { gql, useMutation } from '@apollo/client'

const ADD_PRODUCT = gql`
    mutation addProduct($productInput: productInput!){
        addProduct(productInput: $productInput) {
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

const UPLOAD_IMAGE = gql`
    mutation uploadImage($image: Upload!) {
        uploadImage(image: $image)
    }
`

const UPDATE_PRODUCT = gql`
    mutation updateProduct($productID: String!, $productInput: productInput!){
        updateProduct(productID: $productID, productInput: $productInput) {
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

export default function DataInputModal(props) {
    const [addProduct] = useMutation(ADD_PRODUCT, {
        update(cache, { data: { addProduct } }) {
            cache.modify({
                fields: {
                    products(existingProducts = []) {
                        const newProductRef = cache.writeFragment({
                            data: addProduct,
                            fragment: gql`
                                fragment NewProduct on product {
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
                            `
                        });
                        return [newProductRef,...existingProducts];
                    }
                }
            });
        }
    });

    const [updateProduct] = useMutation(UPDATE_PRODUCT);
    const [uploadImage] = useMutation(UPLOAD_IMAGE);

    const handleProductSubmit = (productInput) => {
        if(props.product) {
            updateProduct({variables:{
                productID: props.product._id,
                productInput: productInput
            }})
        }
        else {
            console.log(productInput.image);
            addProduct({variables:{
                productInput: productInput
            }})
        }
        props.hideModal();
    }

    return (
        <div>
            <Modal centered show='true' onHide={props.hideModal}>
                <Modal.Header closeButton>
                <h3>{props.product ? "Modify Product" : "Create Product"}</h3>
                </Modal.Header>
                <Modal.Body className="gray-bg">
                    <DataInputForm handleProductSubmit={handleProductSubmit} hideModal={props.hideModal} product={props.product}/>
                </Modal.Body>
            </Modal>
        </div>
    )
}
