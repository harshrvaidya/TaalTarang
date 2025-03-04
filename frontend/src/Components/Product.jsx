import React from 'react'

import { useDispatch } from 'react-redux';
import { Add } from '../Features/Shop/Shopslice';

const Product = ({product}) => { 
    const dispatch = useDispatch();
    // the product is the props
  return (
    <div className='col mt-5'> 
      <div class="card h-100" style={{width: '18rem'}}>   
  <img src={product.thumbnail} class="card-img-top h-75" alt="..."/>
  <div class="card-body">
    <h4 class="card-title">rs {product.price}</h4>
    <h5>{product.title}</h5>
    <button onClick={() => dispatch(Add({ ...product, quantity: 1 }))}>Add to cart</button>
  </div>
</div>
    </div>
  )
}

export default Product
