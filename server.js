const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config({path:'config/keys.env'});
const customersController = require('./controllers/CustomersController');
const productsController = require('./controllers/ProductsController');


app.use("/customers", customersController);
app.use("/customers", productsController);


app.listen(process.env.PORT,()=>{
    console.log(`Restful API is up and running on port ${process.env.PORT}.`);

    mongoose.connect(process.env.MONGO_CONNECTION_STRING)
    .then(()=>{
        console.log(`Connected successfully to MongoDB.`)
    })
    .catch(err=>{
        console.log(`Error: ${err}.`);
    })
})