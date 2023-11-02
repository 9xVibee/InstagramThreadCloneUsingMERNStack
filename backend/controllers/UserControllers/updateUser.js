import User from "../../models/userModel.js";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";

const updateUser = async (req, res) => {
  const { name, username, email, password, bio } = req.body;
  let { profilePic } = req.body;
  const userId = req.user._id;

  try {
    let user = await User.findById(userId);

    if (!user)
      return res.status(400).json({
        error: "user not found",
      });

    //checking if it is the same user or not
    if (req.params.id !== userId.toString())
      return res.status(400).json({
        message: "you cannot update other user account!",
      });

    // changing password if it is provided
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    // changing the profile and uploading to the cloudinary
    if (profilePic) {
      if (user.profilepic) {
        await cloudinary.uploader.destroy(
          user.profilepic.split("/").pop().split(".")[0]
        );
      }

      const uploadedResponse = await cloudinary.uploader.upload(profilePic);
      profilePic = uploadedResponse.secure_url;
      console.log("In clodinary");
    }

    //changing other information if that is provided!
    user.name = name || user.name;
    user.username = username || user.username;
    user.email = email || user.email;
    user.profilepic = profilePic || user.profilePic;
    user.bio = bio || user.bio;

    user = await user.save();

    res.status(200).json(user);
  } catch (err) {
    console.log("Error in update route :" + err.message);
    res.status(500).json({
      message: err.message,
    });
  }
};

export default updateUser;
