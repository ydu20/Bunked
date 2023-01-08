// Track all the actions (accept, waiting room, reject)
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const actionSchema = new Schema({
    // These fields are NOT unique, if a baseUser wants multiple targets in their waiting room, then there would be multiple documents/records of the baseUser, 1 separate record for each target user
    baseUserEmail: { // Email of the user whose waiting room we are referring to
        type: String,
        required: true,
        trim: true,
        minlength: 5,
    }, 
    targetUserEmail: { // Email of the user that is in the base user's waiting room
        type: String,
        required: true,
        trim: true,
        minlength: 5,
    },
    actionType: { // Type of action, 0 for accept, 1 for waitlist, 2 for reject
        type: Number,
        required: true,
    }
})

const Action = mongoose.model('Action', actionSchema);

module.exports = Action;