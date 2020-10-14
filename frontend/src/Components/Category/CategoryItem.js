import React from 'react'
import { Button } from 'react-bootstrap'

export default function categoryItem(props) {
    return (
        <div className="category-box mb-1">
            <div className="row">
                <div className={props.category.numberOfProducts ? "col-12" : "col-10"}>
                    <h5>{props.category.categoryName}</h5>
                    <p>{props.category.numberOfProducts} Products</p>
                </div>
                {!props.category.numberOfProducts && <Button variant="danger" className='text-center col-2' onClick={() => props.onCategoryDelete(props.category._id)}>
                    <i className="far fa-trash-alt"></i>
                </Button>}
            </div>
        </div>
    )
}