import Post from "../../models/postModel.js";
import User from "../../models/userModel.js";
import cloudinary from "cloudinary";

const createPost = async (req, res) => {
  try {
    const { postedBy, text } = req.body;
    let { img } = req.body;

    if (!postedBy || !text)
      return res.status(400).json({
        error: "postedBy and text is required!",
      });

    const user = await User.findById(postedBy);

    if (user._id.toString() !== req.user._id.toString())
      return res.status(400).json({
        error: "UnAuthorized",
      });

    const maxLength = 500;
    if (text.length > maxLength)
      return res.status(400).json({
        error: `Text must be less than ${maxLength} characters`,
      });

    if (img) {
      const uploadedResponse = await cloudinary.uploader.upload(img);
      img = uploadedResponse.secure_url;
      console.log(img);
    }

    const newPost = new Post({ postedBy, img, text });
    await newPost.save();

    res.status(201).json({
      message: "Post created successfully",
      newPost,
    });
  } catch (err) {
    res.status(500).json({
      error: "error in create post " + err.message,
    });
  }
};

export default createPost;
