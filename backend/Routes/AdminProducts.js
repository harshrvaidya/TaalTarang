const express = require('express');
const router = express.Router();
const ProductModel=require('../models/Product');
const {AddProduct,deleteproduct,getParticularProduct, updateProduct} = require('../Controllers/AdminProduct');
// to get all products we are using the same route as normal users so nno new route to fetch all products 
router.post('/addproduct',AddProduct);
router.delete('/:id',deleteproduct);
router.get('/:id',getParticularProduct);
router.put('/:id',updateProduct)
module.exports = router;
// this for product mangement 