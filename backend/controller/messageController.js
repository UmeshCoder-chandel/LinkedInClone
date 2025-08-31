import Message from "../models/message.js";
import User from "../models/user.js";

// Send a message
export const sendMessage = async (req, res) => {
  try {
    const { conversation, message,picture } = req.body;

let addMessage=new Message({sender:req.user._id,conversation,message,picture});
await addMessage.save();
let populatedMessage=await addMessage.populate('sender')
    res.status(201).json(populatedMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get messages by conversation ID
export const getMessagesByConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;
    
    const messages = await Message.find({ conversation: conversationId })
      .populate("sender", "name profilePic")
      .sort({ createdAt: 1 });

    res.json({ message: messages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get conversation between two users
export const getConversation = async (req, res) => {
  try {
    const { userId } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: req.user._id, recipient: userId },
        { sender: userId, recipient: req.user._id },
      ],
    })
      .populate("sender", "name profilePicture")
      .populate("recipient", "name profilePicture")
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get recent chats (list of people I've messaged)
export const getRecentChats = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [{ sender: req.user._id }, { recipient: req.user._id }],
    })
      .populate("sender", "name profilePicture")
      .populate("recipient", "name profilePicture")
      .sort({ createdAt: -1 });

    // unique users
    const chatMap = {};
    messages.forEach((msg) => {
      const otherUser =
        msg.sender._id.toString() === req.user._id.toString()
          ? msg.recipient
          : msg.sender;
      if (!chatMap[otherUser._id]) chatMap[otherUser._id] = msg;
    });

    res.json(Object.values(chatMap));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mark messages as read
export const markAsRead = async (req, res) => {
  try {
    const { userId } = req.params;

    await Message.updateMany(
      { sender: userId, recipient: req.user._id, read: false },
      { $set: { read: true } }
    );

    res.json({ message: "Messages marked as read" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
