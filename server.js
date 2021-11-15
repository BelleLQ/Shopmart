const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors');
const customersController = require('./controllers/CustomersController.js');
const productsController = require('./controllers/ProductsController.js');
const herosController = require('./controllers/HerosController');
var whitelist = ['http://localhost:3000', 'http://127.0.0.1:3000', 'https://flamboyant-morse-789f6d.netlify.app']

if(process.env.NODE_ENV!="production")
{
    require('dotenv').config({ path: 'config/keys.env' });
}

var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
  }

const app = express();

app.use(express.json());
app.use(cors(corsOptionsDelegate));
app.use("/customers", customersController);
app.use("/products", productsController);
app.use("/heros", herosController);


// Non-existing endpoint
app.use((req, res) =>{
        res.json({
            message: 'Invalid Request',
            status: 404
        });
    });

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