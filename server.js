const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config({path:'config/keys.env'});

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