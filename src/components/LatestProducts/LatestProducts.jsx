import React, { use } from 'react';
import Products from '../Products/Products';

const LatestProducts = ({ latestProductsPromise }) => {
    const products = use(latestProductsPromise)
    console.log(products)

  return (
    <div>
        <h2 className='text-5xl text-center font-bold'>Recent products</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5'>
        {products.map((product) => (
          <Products key={product._id} product={product}></Products>
        ))}
      </div>
    </div>
  );
};

export default LatestProducts;