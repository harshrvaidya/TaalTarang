const express = require('express');
const router = express.Router();
const shopController = require('../Controllers/ShopControllers');
const auth = require('../middleware/auth');
const { addToFavorites, getFavoriteShops,removeFromFavorites,rateShop } = require('../Controllers/ShopControllers');
// Route to add a new shop
router.post('/addshop',auth, (req, res, next) => {
  console.log('Received request to add a new shop');
  next();
}, shopController.Addshops);


router.get('/', (req, res, next) => {
  console.log('Received request to get all shops');
  next();
}, shopController.Getshops);

router.get('/getshop/:id', (req, res, next) => {
  console.log(`Received request to fetch shop with ID: ${req.params.id}`);
  next();
}, shopController.getShopById);

router.put('/updateshops/:id',shopController.Updateshop);
router.delete('/deleteshop/:id',shopController.Deleteshop);



router.post('/like/:shopId', auth, shopController.likeShop);
router.post('/unlike/:shopId', auth, shopController.unlikeShop);
router.post('/comment/:shopId', auth, shopController.addComment);




router.post('/favorite/:id', auth, addToFavorites); // Add shop to favorites
router.get('/favorites', auth, getFavoriteShops);
router.delete('/favorite/:id', auth, removeFromFavorites)
router.post('/rate/:shopId', auth, rateShop); // Route to rate a shop
module.exports = router;