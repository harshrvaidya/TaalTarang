const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {UpdateshopBYadmin,adminAddshops} = require('../Controllers/AdminshopController');
router.put("/:id", UpdateshopBYadmin);
router.post("/Adminaddshop",auth,adminAddshops );
module.exports = router;