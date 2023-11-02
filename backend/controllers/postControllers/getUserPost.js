import Post from "../../models/postModel.js";
import User from "../../models/userModel.js";

const getUserPost = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (!user)
      return res.status(404).json({
        error: "User not found",
      });

    const posts = await Post.find({ postedBy: user._id }).sort({
      createdAt: -1,
    });
    
    res.status(200).json(posts);
  } catch (error) {}
};
export default getUserPost;
