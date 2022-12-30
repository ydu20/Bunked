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
    extroversion: {
        type: Number,
        required: true,
    },
    cleaniness: {
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
            required: true,
        }, 
        end : {
            type: Number,
            required: true,
        }
    },
    guests: Number,
    dorm: [String],
    greek: String,
    smoke: String,
    drink: String,
    allergies: [String],
    hobbies: [String],
    hometown: String,
    music: [String],
    shows: [String],
    pictures: [String],
});

const UserBio = mongoose.model('UserBio', userBioSchema);

module.exports = UserBio;