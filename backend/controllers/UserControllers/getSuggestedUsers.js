import User from "../../models/userModel.js";

const getSuggestedUsers = async (req, res) => {
  try {
    // exclude the current user from the suggested user array and also the users which current user is following!
    const userId = req.user._id;

    const usersFollowedByYou = await User.findById(userId).select("following");
    const users = await User.aggregate([
      {
        $match: {
          _id: { $ne: userId },
        },
      },
      {
        $sample: { size: 10 },
      },
    ]);

    const filteredUsers = users.filter(
      (user) => !usersFollowedByYou.following.includes(user._id)
    );

    const SuggestedUsers = filteredUsers.slice(0, 4);
    res.status(200).json(SuggestedUsers);
  } catch (err) {
    console.log("Error in Suggested User ", err.message);
    return res.status(500).json({
      error: err.message,
    });
  }
};

export default getSuggestedUsers;
