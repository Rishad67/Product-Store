
import React, { useState } from 'react'
import ProductItem from './ProductItem';
import { serverURL } from '../../Constants';
import { Button } from 'react-bootstrap';
import DataInputModal from './DataInputModal';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorMessage from '../Common/ErrorMessage'
import { useQuery,gql } from '@apollo/client';

const FETCH_PRODUTS = gql`
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

const defaultEditingProduct = {
    _id : "",
    name : "",
    brand : "",
    price : "",
    details: "",
    categoryID: ""
}

export default function ProductSection() {
    const [showModal,setShowModal] = useState(false);
    const [editingProduct,setEditingProduct] = useState(null);
    let { loading,error,data } = useQuery(FETCH_PRODUTS);

    if(loading) return <LoadingSpinner/>
    if(error) return <ErrorMessage/>

    const switchToEdit = (product) => {
        setEditingProduct(product);
        setShowModal(true);
    }

    return (
        <div  id='product-section'>
            <div className='row pb-2'>
                <div className='col-6'>
                    <h1>Products</h1>
                </div>
                <div className='col-6' style={{display:'flex',justifyContent:'space-between'}}>
                    <Button variant="outline-success" style={{width: '100%'}} onClick={() => setShowModal(true)}>Add Product</Button>
                </div>
            </div>

            <div className='row'>
            {
                data.products.map((product) => <ProductItem key={product._id} product={product} switchToEdit={switchToEdit}/>)
            }
            </div>

            {showModal && <DataInputModal product={editingProduct} hideModal={() => setShowModal(false)}/>}
        </div>
    )
}
