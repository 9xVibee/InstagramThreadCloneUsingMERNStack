import User from "../../models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../../utils/helpers/generateToken.js";

const signUpUser = async (req, res) => {
  try {
    const { name, email, password, username } = req.body;

    // checking if user exists or not
    const isUser = await User.findOne({ $or: [{ email }, { password }] });

    // if user exist then sending to signup with another account
    if (isUser) {
      return res.status(400).json({
        error: "User already exists!",
      });
    }

    // if user not exist then creating the new user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
    });

    await newUser.save();

    if (newUser) {
      // token generating
      generateToken(newUser._id, res);

      res.status(201).json({
        message: "Successfully signed up",
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
        bio: newUser._bio,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({
        error: "Invalid user Data!",
      });
    }
  } catch (error) {
    // if error occurs then res -> error message!
    res.status(500).json({
      error: error.message,
    });
    console.log("Error is signupuser : ", error.message);
  }
};

export default signUpUser;
