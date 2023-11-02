import User from "../../models/userModel.js";
import mongoose from "mongoose";

const getProfileOfUser = async (req, res) => {
  const { query } = req.params;
  try {
    let user;
    if (query && mongoose.Types.ObjectId.isValid(query))
      user = await User.findOne({ _id: query })
        .select("-password")
        .select("-createdAt");
    else
      user = await User.findOne({ username: query })
        .select("-password")
        .select("-createdAt");

    console.log(user);
    if (!user)
      return res.status(400).json({
        error: "user not found",
      });

    res.status(200).json(user);
  } catch (err) {
    console.log("Error in get Profile : " + err);
    res.status(500).json({
      error: "user not found!",
    });
  }
};

export default getProfileOfUser;
