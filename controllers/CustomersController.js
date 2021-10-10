const express = require('express');
const router = express.Router();
const customerService = require('../services/CustomersService');

//create
router.post('/', customerService.createACustomer);

//read all
router.get('/', customerService.readAllCustomers);

//read 1
router.get('/:custId', customerService.readACustomer);

//update
router.put('/:custId', customerService.updateACustomer);

//delete
router.delete('/:custId', customerService.deleteACustomer);

module.exports=router;