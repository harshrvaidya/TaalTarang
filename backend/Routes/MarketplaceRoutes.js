const express = require('express');
const router = express.Router();
const { addProduct, getProducts, getProductById, updateProduct, deleteProduct } = require('../Controllers/MarketplaceControllers');
const auth = require('../middleware/auth');

router.post('/products', auth, addProduct);
router.get('/', getProducts);
router.get('/products/:id', getProductById);
router.put('/products/:id', auth, updateProduct);
router.delete('/products/:id', auth, deleteProduct);

module.exports = router;