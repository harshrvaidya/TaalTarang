const express = require('express');
const router = express.Router();
const ProductModel=require('../models/Product');
const {AddProduct} = require('../Controllers/AdminProduct');

router.post('/addproduct',AddProduct);

module.exports = router;