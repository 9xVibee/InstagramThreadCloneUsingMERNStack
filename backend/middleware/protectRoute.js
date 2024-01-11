import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protectRoute = async (req, res, next) => {
  try {
    // jwt this name should be same as given in token generator
    const token = req.cookies.jwt;

    if (!token)
      return res.status(401).json({
        error: "Unauthorized, Login first",
      });

    const decode = jwt.decode(token, process.env.JWT_SECRET);
    const user = await User.findById(decode.userId).select("-password");

    req.user = user;
    next();
  } catch (error) {
    // if error occurs then res -> error message!
    res.status(500).json({
      message: error.message,
    });
    console.log("Error is ProtectRoute : ", error.message);
  }
};

export default protectRoute;
