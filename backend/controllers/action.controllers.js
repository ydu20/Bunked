// Methods to change and update the actions of the users
let Action = require('../models/action.model');
let User = require('../models/user.model');

// Gets all other users that a given user has accepted
// Input URL params: req.query.email, email of the base user
// Output: Array of USER objects that user has accepted
const getAccepted = async (req, res) => {

    const baseUserEmail = req.query.email;
    const baseUser = await User.findOne({email: baseUserEmail});

    if (!baseUser) {
        return res.status(404).json('User does not exist');
    }

    // Get all pairings of the base user where the base user has accepted
    const pairings = await Action.find({baseUserEmail: baseUserEmail, actionType: 0});

    // Get email addresses of all the target users
    const targetEmails = pairings.map(pair => pair.targetUserEmail);

    // Get target users
    const targetUsers = await User.find({email: {$in: targetEmails}});
    
    return res.status(200).json(targetUsers);
}

// Route used when base user accepts target user
// Input body: req.body.baseEmail email of base user, req.body.targetEmail email of accepted user
const acceptUser = async (req, res) => {

    const baseUserEmail = req.body.baseEmail;
    const targetUserEmail = req.body.targetEmail;

    // Check if both user's exist
    const baseUser = await User.findOne({email: baseUserEmail});
    const targetUser = await User.findOne({email: targetUserEmail});

    if (!baseUser || !targetUser) {
        return res.status(404).json('User does not exist');
    }

    // See if there is already record
    const numExists = await Action.count({baseUserEmail: baseUserEmail, targetUserEmail: targetUserEmail, actionType: 0});
    if (numExists > 0) {
        return res.status(409).json('Error: User already accepted');
    }

    // Add to database
    const actionType = 0;
    
    const newPair = new Action({
        baseUserEmail,
        targetUserEmail,
        actionType,
    })

    newPair.save().then(() => {return res.status(201).json('User accepted')})
        .catch(err => {return res.status(400).json('Error: ' + err)})
}

// Gets all other users that a given user has rejected
// Input URL params: req.query.email, email of the base user
// Output: Array of USER objects that user has rejected
const getRejected = async (req, res) => {

    const baseUserEmail = req.query.email;
    const baseUser = await User.findOne({email: baseUserEmail});

    if (!baseUser) {
        return res.status(404).json('User does not exist');
    }

    // Get all pairings of the base user where the base user has accepted
    const pairings = await Action.find({baseUserEmail: baseUserEmail, actionType: 2});

    // Get email addresses of all the target users
    const targetEmails = pairings.map(pair => pair.targetUserEmail);

    // Get target users
    const targetUsers = await User.find({email: {$in: targetEmails}});
    
    return res.status(200).json(targetUsers);
}

// Route used when base user rejects target user
// Input body: req.body.baseEmail email of base user, req.body.targetEmail email of rejected user
const rejectUser = async (req, res) => {

    const baseUserEmail = req.body.baseEmail;
    const targetUserEmail = req.body.targetEmail;

    // Check if both user's exist
    const baseUser = await User.findOne({email: baseUserEmail});
    const targetUser = await User.findOne({email: targetUserEmail});

    if (!baseUser || !targetUser) {
        return res.status(404).json('User does not exist');
    }

    // See if there is already record
    const numExists = await Action.count({baseUserEmail: baseUserEmail, targetUserEmail: targetUserEmail, actionType: 2});
    if (numExists > 0) {
        return res.status(409).json('Error: User already rejected');
    }

    // Add to database
    const actionType = 2;
    
    const newPair = new Action({
        baseUserEmail,
        targetUserEmail,
        actionType,
    })

    newPair.save().then(() => {return res.status(201).json('User rejected')})
        .catch(err => {return res.status(400).json('Error: ' + err)})
}

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
    const pairings = await Action.find({baseUserEmail: baseUserEmail, actionType: 1});

    // Get email addresses of all the target users
    const targetEmails = pairings.map(pair => pair.targetUserEmail);

    // Get target users
    const targetUsers = await User.find({email: {$in: targetEmails}});
    
    return res.status(200).json(targetUsers);
}

// Add a user to a given user's waiting room
// Input body: req.body.baseEmail  email of base user, req.body.targetEmail email of added user
const addToWaitingRoom = async (req, res) => {

    const baseUserEmail = req.body.baseEmail;
    const targetUserEmail = req.body.targetEmail;

    // Check if both user's exist
    const baseUser = await User.findOne({email: baseUserEmail});
    const targetUser = await User.findOne({email: targetUserEmail});

    if (!baseUser || !targetUser) {
        return res.status(404).json('User does not exist');
    }

    // See if there is already record
    const numExists = await Action.count({baseUserEmail: baseUserEmail, targetUserEmail: targetUserEmail, actionType: 1});
    if (numExists > 0) {
        return res.status(409).json('Error: User already in the waiting room');
    }

    // Add to database
    const actionType = 1;
    
    const newPair = new Action({
        baseUserEmail,
        targetUserEmail,
        actionType,
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
    const removed = await Action.deleteOne({baseUserEmail: baseUserEmail, targetUserEmail: targetUserEmail, actionType: 1});
    if (removed.deletedCount == 0) {
        return res.status(404).json('User not in waiting room, no records deleted');
    } else {
        return res.status(200).json('Removed from waiting room');
    }
}

module.exports = {
    getAccepted,
    acceptUser,
    getRejected,
    rejectUser,
    getUsersInWaitingRoom,
    addToWaitingRoom,
    removeFromWaitingRoom,
}