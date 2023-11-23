import Conversation from "../../models/conversationModel.js";

const getConversations = async (req, res) => {
  const userId = req.user._id;
  try {
    const conversations = await Conversation.find({
      participants: userId,
    }).populate({
      path: "participants",
      select: "username profilepic",
    });

    // removing current userId from participants
    conversations.forEach((conversation) => {
      conversation.participants = conversation.participants.filter(
        (participants) => participants._id.toString() !== userId.toString()
      );
    });
      
    res.status(200).json(conversations);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
    console.log("Get conversation error " + err.message);
  }
};

export default getConversations;
