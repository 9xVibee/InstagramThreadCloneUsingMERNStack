import Post from "../../models/postModel.js";

const replyToPost = async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.user._id;
    const userProfilePic = req.user.profilepic;
    const username = req.user.username;

    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!text)
      return res.status(400).json({
        error: "Text filed required!",
      });

    if (!post)
      return res.status(400).json({
        error: "Post not Found",
      });

    const reply = { userId, username, text, userProfilePic };
    post.replies.push(reply);

    await post.save();
    res.status(500).json({
      message: "Reply added successfully",
    });
  } catch (err) {
    console.log("Error in reply to post " + err.message);
    res.status(400).json({
      error: err.message,
    });
  }
};
export default replyToPost;
