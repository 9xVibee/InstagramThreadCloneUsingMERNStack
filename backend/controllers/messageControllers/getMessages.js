import Conversation from "../../models/conversationModel.js";
import Message from "../../models/messageModel.js";

const getMessages = async (req, res) => {
  const { otherUserId } = req.params;
  try {
    const userId = req.user._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [userId, otherUserId] },
    });

    if (!conversation) {
      return res.status(400).json({
        error: "Conversation not found!",
      });
    }

    const messages = await Message.find({
      conversationId: conversation._id,
    }).sort({
      createdAt: 1,
    });

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
    console.log("Error in get Messages " + err.message);
  }
};
export default getMessages;
