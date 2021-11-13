const express = require('express');
const router = express.Router();
const herosService = require('../services/HerosService');

//create
router.post('/', herosService.createAHero);

//read all that are now on sale
router.get('/', herosService.readAllHeros);

//read history
router.get('/history', herosService.readHerosHistory);

//read 1
router.get('/:heroId', herosService.readAHero);

//update
router.put('/:heroId', herosService.updateAHero);

//delete
router.delete('/:heroId', herosService.deleteAHero);

module.exports=router;