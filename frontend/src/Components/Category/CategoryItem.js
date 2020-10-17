import React from 'react'
import { Button } from 'react-bootstrap'
import { useMutation,gql } from '@apollo/client'

const DELETE_CATEGORY = gql`
    mutation deleteCategory($categoryID: String!){
        deleteCategory(categoryID: $categoryID)
    }
`;

export default function CategoryItem(props) {
    const [deleteCategory] = useMutation(DELETE_CATEGORY, {
        update(cache, { data: { deleteCategory } }) {
            cache.modify({
                fields: {
                    categories(existingCategories = []) {
                        let updatedCategories = existingCategories.filter(category => !category.__ref.includes(props.category._id));
                        return updatedCategories;
                    }
                }
            });
        }
    });

    const handleDeleteCategory = (categoryID) => {
        deleteCategory({variables:{
            categoryID: categoryID
        }})
    }

    return (
        <div className="category-box mb-1">
            <div className="row">
                <div className={props.category.numberOfProducts ? "col-12" : "col-10"}>
                    <h5>{props.category.categoryName}</h5>
                    <p>{props.category.numberOfProducts} Products</p>
                </div>
                {!props.category.numberOfProducts && <Button variant="danger" className='text-center col-2' onClick={() => handleDeleteCategory(props.category._id)}>
                    <i className="far fa-trash-alt"></i>
                </Button>}
            </div>
        </div>
    )
}