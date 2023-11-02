import bcrypt from "bcryptjs";
import User from "../../models/userModel.js";
import generateToken from "../../utils/helpers/generateToken.js";

const loginUser = async (req, res) => {
  try {
    // getting details from req.body
    const { username, password } = req.body;

    // finding the user in the database
    const user = await User.findOne({ username });

    // checking if password is valid or not
    const isValidPassword = await bcrypt.compare(
      password,
      user?.password || ""
    );

    // if user doesn't exist or password is wrong then sending the message
    if (!user || !isValidPassword)
      return res.status(400).json({
        error: "Invalid username or password",
      });

    generateToken(user._id, res); // generating token

    // if user and password is valid then sending the details as response
    res.status(200).json({
      message: "Login successfull",
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      bio: user.bio,
      profilePic: user.profilePic,
    });
  } catch (error) {
    // if error occurs then res -> error message!
    res.status(500).json({
      error: error.message,
    });
    console.log("Error is loginUser : ", error.message);
  }
};

export default loginUser;
