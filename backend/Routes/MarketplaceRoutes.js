const express = require('express');
const router = express.Router();
const { addProduct, getProducts, getProductById, updateProduct, deleteProduct,payment,addToHistory } = require('../Controllers/MarketplaceControllers');
const auth = require('../middleware/auth');


router.post('/pay',payment)
router.get('/', getProducts);
router.get('/products/:id', getProductById);



module.exports = router;