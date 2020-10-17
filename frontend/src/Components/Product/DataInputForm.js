import React, { useState } from 'react'
import { Button,FormLabel,FormControl } from 'react-bootstrap'
import LoadingSpinner from '../Common/LoadingSpinner'
import ErrorMessage from '../Common/ErrorMessage'
import { useQuery,gql } from '@apollo/client'


const FETCH_CATEGORY = gql`
    query {
        categories {
            _id
            categoryName
            numberOfProducts
        }
    }
`

export default function DataInputForm(props) {
    const [name,setName] = useState(props.product ? props.product.name : "");
    const [brand,setBrand] = useState(props.product ? props.product.brand : "");
    const [details,setDetails] = useState(props.product ? props.product.details : "");
    const [price,setPrice] = useState(props.product ? props.product.price : "");
    const [category,setCategory] = useState(props.product ? props.product.category._id : "");
    const [newImage,setNewImage] = useState(null);

    const {loading,error,data} = useQuery(FETCH_CATEGORY);

    if(loading) return <LoadingSpinner/>
    if(error){
        console.log(error);
        return <ErrorMessage/>
    }

    const handleProductSubmit = () => {
        let productInput = {
            name: name,
            brand: brand,
            details: details,
            price: Number(price),
            categoryID: category
        }

        props.handleProductSubmit(productInput);
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-6 p-1">
                    <FormLabel>Product Name*</FormLabel>
                    <FormControl type='text' onChange={(e) => setName(e.target.value)} value={name}/>
                </div>
                <div className="col-md-6 p-1">
                    <FormLabel>Brand*</FormLabel>
                    <FormControl type='text' onChange={(e) => setBrand(e.target.value)} value={brand}/>
                </div>
                <div className="col-md-6 p-1">
                    <FormLabel>Details*</FormLabel>
                    <FormControl type='text' onChange={(e) => setDetails(e.target.value)} value={details}/>
                </div>
                <div className="col-md-6 p-1">
                    <FormLabel>Price*</FormLabel>
                    <FormControl type='text' onChange={(e) => setPrice(e.target.value)} value={price}/>
                </div>
                <div className="col-md-6 p-1">
                    <FormLabel>Category*</FormLabel>
                    <FormControl as="select" onChange={(e) => setCategory(e.target.value)} value={category}>
                    <option>{props.product ? props.product.category.categoryName : ""}</option>
                    {
                        data.categories.map(category => <option value={category._id} key={category._id}>{category.categoryName}</option>)
                    }
                    </FormControl>
                </div>
        
                <div className="col-md-6 p-1">
                    <FormLabel className="text-danger">* Required Fields</FormLabel>
                    <input type='file' onChange={e => setNewImage(e.target.files[0])}/>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-6">
                    <Button variant="success" style={{width: '100%'}} onClick={handleProductSubmit}>Save</Button>
                </div>
                <div className="col-6">
                    <Button variant="danger" style={{width: '100%'}} onClick={props.hideModal}>Cancel</Button>
                </div>
            </div>
        </div>
    )
}
