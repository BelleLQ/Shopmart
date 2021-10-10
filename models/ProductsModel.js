const mongoose = require('mongoose');
const {Schema} = mongoose;
const productSchema = new Schema({
    prodName:{
        type : String,
        required : true
    },
    price:{
        type : Number,
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
        type : Number
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