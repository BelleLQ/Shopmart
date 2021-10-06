const express = require('express');
const router = express.Router();
const productsService = require('../services/ProductsService');

//create
router.post('/', productsService.createAProduct);

//read all
router.get('/', productsService.readAllProducts);

//read 1
router.get('/:prodId', productsService.readAProduct);

//update
router.put('/:prodId', productsService.updateAProduct);

//delete
router.put('/:prodId', productsService.deleteAProduct);

module.exports=router;