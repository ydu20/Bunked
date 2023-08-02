const Chat = require('../models/chat.model');
const User = require('../models/user.model');

// exports.getMessages = async (req, res) => {
//     const email = req.body.email.toLowerCase();

//     const rooms = Message.find({email})
// }


exports.addMessage = async (req, res) => {
    const chatID = req.body.chatID;
    const sender = req.body.sender;
    const message = req.body.message;
    const timeStamp = new Date(req.body.timeStamp);

    const newMessage = new Chat({
        chatID: chatID,
        senderEmail: sender,
        message: message,
        timeStamp: timeStamp,
    });

    newMessage.save().then(() => {
        res.json({success: 'New message saved!'})
    }).catch(err => 
        res.status(400).json('Error: ' + err)
    );

}

exports.getMessages = async(req, res) => {
    const chatID = req.query.id;

    Chat.find({chatID: chatID})
    .then(messages => {
        res.status(200).json(messages);
    })
    .catch(err => {
        res.status(400).json(err);
    })
}