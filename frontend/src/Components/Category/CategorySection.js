
import React from 'react'
import CategoryItem from './CategoryItem'
import { gql} from '@apollo/client'
import LoadingSpinner from '../Common/LoadingSpinner'
import AddCategoryForm from './AddCategoryForm'
import { useQuery } from '@apollo/client'
import ErrorMessage from '../Common/ErrorMessage'


const FETCH_CATEGORY = gql`
    query {
        categories {
            _id
            categoryName
            numberOfProducts
        }
    }
`

export default function CategorySection() {
    const {loading,error,data} = useQuery(FETCH_CATEGORY);

    if(loading) return <LoadingSpinner/>
    if(error){
        console.log(error);
        return <ErrorMessage/>
    }

    return (
        <div  id='category-section'>
            <h1 className="text-center">Categories</h1>
            <AddCategoryForm/>
            {
                data.categories.map(category => <CategoryItem key={category._id} category={category}/>)
            }
        </div>
    )
}