import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductSection from './Components/Product/ProductSection';
import CategorySection from './Components/Category/CategorySection';


function App() {
  return (
    <div className="App row">
        <div className='col-lg-3 col-md-6 col-sm-12'>
          <CategorySection/>
        </div>
        <div className='col-lg-9 col-md-6 col-sm-12'>
          <ProductSection/>
        </div>
    </div>
  );
}

export default App;