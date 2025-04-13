// import React from 'react'

// import { useDispatch } from 'react-redux';
// import { Add } from '../Features/Shop/Shopslice';

// const Product = ({product}) => { 
//     const dispatch = useDispatch();
//     // the product is the props
//   return (
//     <div className='col mt-5'> 
//       <div class="card h-100" style={{width: '18rem'}}>   
//   <img src={product.thumbnail} class="card-img-top h-75" alt="..."/>
//   <div class="card-body">
//     <h4 class="card-title">rs {product.price}</h4>
//     <h5>{product.title}</h5>
//     <button onClick={() => dispatch(Add({ ...product, quantity: 1 }))}>Add to cart</button>
//   </div>
// </div>
//     </div>
//   )
// }

// export default Product


import React from 'react';
import { useDispatch } from 'react-redux';
import { Add } from '../Features/Shop/Shopslice';

const Product = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl">
      {/* Product Image */}
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-48 object-cover"
      />

      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 truncate">{product.title}</h3>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.description}</p>
        <p className="text-xl font-semibold text-orange-600 mt-4">₹{product.price}</p>
      </div>

      {/* Add to Cart Button */}
      <div className="p-4">
        <button
          onClick={() => dispatch(Add({ ...product, quantity: 1 }))}
          className="w-full bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;