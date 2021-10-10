const express = require('express');
const router = express.Router();
const productsService = require('../services/ProductsService.js');

//create
router.post('/', productsService.createAProduct);

//read all
router.get('/', productsService.readAllProducts);

//read all categories
router.get('/categories', productsService.readAllCategories);

//read 1
router.get('/:prodId', productsService.readAProduct);

//update
router.put('/:prodId', productsService.updateAProduct);

//delete
router.delete('/:prodId', productsService.deleteAProduct);

module.exports=router;