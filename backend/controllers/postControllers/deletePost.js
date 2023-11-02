import Post from "../../models/postModel.js";
import cloudinary from "cloudinary";

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post)
      return res.status(404).json({
        error: "Post not found",
      });

    if (req.user._id.toString() !== post.postedBy.toString())
      return res.status(401).json({
        error: "UnAuthorized to delete the others posts!",
      });

    if (post.img) {
      const imgId = post.img.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imgId);
    }

    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (err) {
    console.log("Error is delete Post " + err.message);
    res.status(400).json(err.message);
  }
};

export default deletePost;
