const Chat = require('../Models/Chat');
const Message = require('../Models/Message');
// const Appointment = require('../Models/Appointment');

exports.getChat = async (req, res) => {
  // search for the chat by the 2 users (req.user._id) and pharmacist id
  const receiver = req.params.receiver;
  console.log('params => ' + receiver);
  let chat;
  let newChat;
  if (req.role === 'pharmacist') {
    // const appointments = await Appointment.find({ patient: receiver, pharmacist: req.user.username });
    chat = await Chat.findOne({ patient: receiver, pharmacist: req.user.username });
    if (chat) {
      res.status(200).json({ chat });
    } else {
      newChat = await Chat.create({ patient: receiver, pharmacist: req.user.username });
      res.status(200).json({ newChat });
    }
  } else if (req.role === 'patient') {
    // const appointments = await Appointment.find({ patient: req.user.username, pharmacist: receiver });
    chat = await Chat.findOne({ patient: req.user.username, pharmacist: receiver });
    if (chat) {
      res.status(200).json({ chat });
    } else {
      newChat = await Chat.create({ patient: req.user.username, pharmacist: receiver });
      res.status(200).json({ newChat });
    }
  }
  // if chat exists return it as a response
  // if not create a new chat between the 2 and save it into the db
};

exports.getChatsByUserId = async (req, res) => {
  // search the chat model in the db for chats by the user id
  let chats;
  if (req.role === 'pharmacist') {
    chats = await Chat.find({ pharmacist: req.user.username }).sort({ updatedAt: -1 });
  } else if (req.role === 'patient') {
    chats = await Chat.find({ patient: req.user.username }).sort({ updatedAt: -1 });
  }

  res.status(200).json({ chats });
  // the user type can be known from the data of logged in user
  // sort the chats by the updatedAt timestamp
  // return the chats if present else return empty array of chats
};

exports.sendMessage = async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log('Invalid data passed into request');
    return res.status(400).json({ message: 'Invalid data passed into request' });
  }

  const newMessage = {
    sender: req.user.username,
    content: content,
    chat: chatId,
  };

  const messageSent = await Message.create(newMessage);
  res.status(201).json({
    status: 'success. message sent.',
    messageSent,
  });
};

exports.getMessagesByChatId = async (req, res) => {
  const chatId = req.params.chatId;
  const messages = await Message.find({ chat: chatId }).sort({ updatedAt: 1 });
  res.status(200).json({ status: 'success. chat messages retrieved', messages });
};
