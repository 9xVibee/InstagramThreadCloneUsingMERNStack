const logoutUser = (req, res) => {
  try {
    // setting cookie expiring time to 1 mili sec so it will expire imediately!
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({
      message: "Logout Successfull",
    });
  } catch (error) {
    // if error occurs then res -> error message!
    res.status(500).json({
      message: error.message,
    });
    console.log("Error is LogoutUser : ", error.message);
  }
};

export default logoutUser;
