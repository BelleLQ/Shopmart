const express = require('express');
const mongoose = require('mongoose');
const customersController = require('./controllers/CustomersController.js');
const productsController = require('./controllers/ProductsController.js');

if(process.env.NODE_ENV!="production")
{
    require('dotenv').config({ path: 'config/keys.env' });
}
const app = express();

app.use(express.json());

app.use("/customers", customersController);
app.use("/products", productsController);


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