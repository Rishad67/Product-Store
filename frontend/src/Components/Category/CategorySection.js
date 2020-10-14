
import React, { Component, createRef } from 'react'
import CategoryItem from './CategoryItem';
import { serverURL } from '../../Constants';
import {Button,FormControl} from 'react-bootstrap';

export default class CategorySection extends Component {
    constructor(props) {
        super(props)
        this.newCategory = React.createRef();

        this.state = {
            loading: true,
            categories: []
        }
    }

    componentDidMount() {
        this.fetchCategories();
    }
    
    render() {
        if(this.state.loading)
            return (<div className='text-center p-5'>
                    <span className="spinner-border spinner-border-lg" role="status" aria-hidden="true"></span>
                </div>)
        
        return (
            <div  id='category-section'>
                <h1 className="text-center">Categories</h1>
                <div className='mb-1 row'>
                    <FormControl className='col-9' type='text' ref={this.newCategory}/>
                    <Button className='col-3' variant="success" onClick={this.addCategory}>Add</Button>
                </div>
                {
                    this.state.categories.map(category => {
                        return (<CategoryItem key={category._id} category={category} onCategoryDelete={this.deleteCategory}/>);
                    })
                }
            </div>
        )
    }
    
    deleteCategory = (categoryID) => {
        this.setState({loading: true},() => {
            const reqBody = {
                query: `
                    mutation {
                        deleteCategory(categoryID: "${categoryID}")
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
                console.log(resData);
                let updatedCategory = this.state.categories.filter(c => c._id !== categoryID);
                this.setState({categories: updatedCategory,loading:false});
            })
            .catch(err => console.log(err));
        })
    }

    addCategory = (event) => {
        let category = this.newCategory.current.value;
        this.setState({loading: true},() => {
            const reqBody = {
                query: `
                    mutation {
                        addCategory(categoryInput:{categoryName: "${category}"}) {
                            _id
                            categoryName
                            numberOfProducts
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
                console.log(resData);
                let updatedCategory = [...this.state.categories];
                updatedCategory.push(resData.data.addCategory)
                this.setState({categories: updatedCategory,loading:false});
            })
            .catch(err => console.log(err));
        })
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
    } 
}