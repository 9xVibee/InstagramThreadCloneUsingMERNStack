import User from "../../models/userModel.js";

const followAndUnfollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const modifyUser = await User.findById(id);
    const currentUser = await User.findById(req.user._id);

    // checking if user sends his own id or not
    if (id === req.user._id.toString())
      res.status(400).json({
        message: "You cannot follow/unfollow yourself",
      });

    if (!currentUser || !modifyUser)
      res.status(400).json({
        message: "user not found!",
      });

    // toggling the follwing and unfollowing
    const isFollowing = currentUser.following.includes(id);
    if (isFollowing) {
      // unfollow user
      // modify the current user following and modify followers of modifyUser
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      res.status(200).json({
        message: `Unfollowed the ${modifyUser.username}`,
      });
    } else {
      // follow user
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      res.status(200).json({
        message: `following the ${modifyUser.username}`,
      });
    }
  } catch (error) {
    // if error occurs then res -> error message!
    res.status(500).json({
      error: error.message,
    });
    console.log("Error is followAndUnfollowUser : ", error.message);
  }
};

export default followAndUnfollowUser;
