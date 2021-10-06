const mongoose = require('mongoose');
const {Schema} = mongoose;
const productSchema = new Schema({
    prodName:{
        type : String,
        required : true
    },
    price:{
        type : String,
        required : true
    },
    description:{
        type : String,
    },
    category:{
        type : String,
        required : true
    },
    quantity:{
        type : String
    },
    isBestSeller:{
        type : Boolean,
        required : true
    },
    photoUrl:{
        type: String
    }
    
})
const productModel = mongoose.model('Product', productSchema);
module.exports = productModel;