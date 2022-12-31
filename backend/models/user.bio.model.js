const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userBioSchema = new Schema ({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 5,
    }, 
    gender: {
        type: String,
        required: true,
        trim: true,
        minlength: 4,
    },
    majors: {
        type: [String],
        required: true,
        trim: true,
    }, 
    year: {
        type: Number,
        required: true,
    },
    extroversion: {
        type: Number,
        required: true,
    },
    cleanliness: {
        type: Number,
        required: true,
    },
    noise: {
        type: Number,
        reequired: true,
    },
    sleep: {
        start : {
            type: Number,
        }, 
        end : {
            type: Number,
        }
    },
    guests: Number,
    dorm: [String],
    greek: Number,
    smoke: Number,
    drink: Number,
    hobbies: [String],
    hometown: String,
    music: [String],
    shows: [String],
    pictures: [String],
});

const UserBio = mongoose.model('UserBio', userBioSchema);

module.exports = UserBio;