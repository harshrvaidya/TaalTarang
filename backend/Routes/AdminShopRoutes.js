const express = require('express');
const router = express.Router();
const {UpdateshopBYadmin} = require('../Controllers/AdminshopController');
router.put("/:id", UpdateshopBYadmin);

module.exports = router;