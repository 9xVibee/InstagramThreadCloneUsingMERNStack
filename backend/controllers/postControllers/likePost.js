import Post from "../../models/postModel.js";

const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    const post = await Post.findById(postId);

    if (!post)
      return res.status(401).json({
        error: "Post not found",
      });

    const userLikePost = post.likes.includes(userId);   
    if (userLikePost) {
      // unlike the post
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      res.status(500).json({
        message: "Post unliked successfully",
      });
    } else {
      // like the post
      post.likes.push(userId);
      await post.save();
      res.status(500).json({
        message: "Post liked successfully",
        length: post.likes.length,
      });
    }
  } catch (err) {
    console.log("Error in Like Post : " + err.message);
    res.status(400).json({
      error: err.message,
    });
  }
};

export default likePost;
