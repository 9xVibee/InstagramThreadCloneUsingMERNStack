import Conversation from "../../models/conversationModel.js";
import Message from "../../models/messageModel.js";
import { getReceiverSocketId, io } from "../../socket/socket.js";

const sendMessage = async (req, res) => {
  try {
    const { receiverId, message } = req.body;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, receiverId],
        lastMessage: {
          text: message,
          sender: senderId,
        },
      });
      await conversation.save();
    }

    const newMessage = new Message({
      sender: senderId,
      conversationId: conversation._id,
      text: message,
    });

    await Promise.all([
      newMessage.save(),
      conversation.updateOne({
        lastMessage: {
          sender: senderId,
          text: message,
        },
      }),
    ]);

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
    console.log("Error in send Message " + err.message);
  }
};
export default sendMessage;
