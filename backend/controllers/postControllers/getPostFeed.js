import Post from "../../models/postModel.js";
import User from "../../models/userModel.js";

const getPostFeed = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    // if user not find then return from here!
    if (!user)
      return res.status(400).json({
        message: "User not found",
      });

    const following = user.following;

    // find posts which are posted by the ppl we are following
    const getFeed = await Post.find({ postedBy: { $in: following } }).sort({
      createdAt: -1,
    });

    res.status(200).json(getFeed);
  } catch (err) {
    console.log("Error in getPostFeed " + err.message);
    res.status(400).json({
      message: err.message,
    });
  }
};

export default getPostFeed;
