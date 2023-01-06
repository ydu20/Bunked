// Methods to change and update the waiting rooms of the users
let Waitroom = require('../models/waitroom.model');
let User = require('../models/user.model');

// Gets all other users in given user's waiting room
// Input URL params: req.query.email, email of the base user
// Output: Array of USER objects of users in the base user's waiting room
const getUsersInWaitingRoom = async (req, res) => {

    const baseUserEmail = req.query.email;
    const baseUser = await User.findOne({email: baseUserEmail});

    if (!baseUser) {
        return res.status(404).json('User does not exist');
    }

    // Get all pairings of the baseUser
    const pairings = await Waitroom.find({baseUserEmail: baseUserEmail});

    // Get email addresses of all the target users
    const targetEmails = pairings.map(pair => pair.targetUserEmail);

    // Get target users
    const targetUsers = await User.find({email: {$in: targetEmails}});
    
    return res.status(200).json(targetUsers);
}

// Add a user to a given user's waiting room
// Input URL params: req.body.baseEmail  email of base user, req.body.targetEmail email of added user
const addToWaitingRoom = async (req, res) => {

    const baseUserEmail = req.body.baseEmail;
    const targetUserEmail = req.body.targetEmail;

    // Check if both user's exist
    const baseUser = await User.findOne({email: baseUserEmail});
    const targetUser = await User.findOne({email: targetUserEmail});

    if (!baseUser || !targetUser) {
        return res.status(404).json('User does not exist');
    }

    // Add to database
    const newPair = new Waitroom({
        baseUserEmail,
        targetUserEmail
    })

    newPair.save().then(() => {return res.status(201).json('User added to waiting room')})
        .catch(err => {return res.status(400).json('Error: ' + err)})
}

// Add a user to a given user's waiting room
// Input URL params: req.body.baseEmail  email of base user, req.body.targetEmail email of removed user
const removeFromWaitingRoom = async (req, res) => {
    const baseUserEmail = req.body.baseEmail;
    const targetUserEmail = req.body.targetEmail;

    // Check if both user's exist
    const baseUser = await User.findOne({email: baseUserEmail});
    const targetUser = await User.findOne({email: targetUserEmail});

    if (!baseUser || !targetUser) {
        return res.status(404).json('User does not exist');
    }

    // Delete from DB
    const removed = await Waitroom.deleteOne({baseUserEmail: baseUserEmail, targetUserEmail: targetUserEmail});
    if (removed.deletedCount == 0) {
        return res.status(404).json('User not in waiting room, no records deleted');
    } else {
        return res.status(200).json('Removed from waiting room');
    }
}

module.exports = {
    getUsersInWaitingRoom,
    addToWaitingRoom,
    removeFromWaitingRoom,
}