const mongoose = require('mongoose');
const {Schema} = mongoose;
const heroSchema = new Schema({
    heroName:{
        type : String,
        required : true
    },
    description:{
        type : String,
    },
    photoUrl:{
        type: String,
        required: true
    },
    startDate:{
        type: Date,
        required: true
    },
    endDate:{
        type: Date,
        required: true
    }
    
})
const heroModel = mongoose.model('Hero', heroSchema);
module.exports = heroModel;