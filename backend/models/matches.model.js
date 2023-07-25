const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const matchesSchema = new Schema({
    
    userA: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
    },
    userB: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
    }
})