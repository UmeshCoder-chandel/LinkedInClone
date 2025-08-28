import Message from "../models/message.js";
import User from "../models/user.js";

// Send a message
export const sendMessage = async (req, res) => {
  try {
    const { recipientId, text } = req.body;

    if (!text) return res.status(400).json({ message: "Message text is required" });

    // (Optional) check if they are connected before sending
    const recipient = await User.findById(recipientId);
    if (!recipient) return res.status(404).json({ message: "Recipient not found" });

    const message = await Message.create({
      sender: req.user._id,
      recipient: recipientId,
      text,
    });

    res.status(201).json(message);
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

// Get recent chats (list of people I’ve messaged)
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
