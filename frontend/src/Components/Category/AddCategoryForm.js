
import React,{useState} from 'react'
import {Button,FormControl} from 'react-bootstrap'
import {gql,useMutation} from '@apollo/client'

const ADD_CATEGORY = gql`
    mutation addCategory($categoryName: String!){
        addCategory(categoryInput:{categoryName: $categoryName}) {
            _id
            categoryName
            numberOfProducts
        }
    }
`

export default function AddCategoryForm() {
    const [category,setCategory] = useState();
    const [addCategory] = useMutation(ADD_CATEGORY, {
        update(cache, { data: { addCategory } }) {
            cache.modify({
                fields: {
                    categories(existingCategories = []) {
                        const newCategoryRef = cache.writeFragment({
                            data: addCategory,
                            fragment: gql`
                                fragment NewCategory on category {
                                    _id
                                    categoryName
                                    numberOfProducts
                                }
                            `
                        });
                        return [newCategoryRef,...existingCategories];
                    }
                }
            });
        }
    });

    const handleDeleteCategory = () => {
        addCategory({variables:{
            categoryName: category
        }})
    }

    return (
        <div className='mb-1 row'>
            <FormControl className='col-9' type='text' onChange={(e) => setCategory(e.target.value)}/>
            <Button className='col-3' variant="success" onClick={handleDeleteCategory}>Add</Button>
        </div>
    )
}
