import Post from "../../models/postModel.js";

const getPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    // checking if post exist or not!
    if (!post)
      return res.status(400).json({
        message: "Post not found!",
      });

    res.status(200).json(post);
  } catch (err) {
    console.log("Error in get post " + err.message);
    res.status(500).json({
      message: err.message,
    });
  }
};

export default getPost;
