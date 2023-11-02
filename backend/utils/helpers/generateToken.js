import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {
  // creating token using jwt
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    httpOnly: true, //these cookie cannot be accessed by the browser/javascript so it is more secure
    maxAge: 15 * 24 * 24 * 60 * 1000, // 15 days
    sameSite: "strict",
  });

  return token;
};

export default generateToken;
