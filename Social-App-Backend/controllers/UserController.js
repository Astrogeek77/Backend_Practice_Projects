const User = require("../models/User");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);
    const token = await jwt.sign({ id: user._id }, process.env.SECRET);
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = await jwt.sign({ id: user._id }, process.env.SECRET);
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const addRemoveFriend = async (req, res) => {
  const { friendID, USER_ID } = req.body;
  let theUser = await User.findById(USER_ID);
  const userFriend = await User.findById(friendID);

  let followersArr = userFriend.followers;
  let followingArr = theUser.following;

  const hasFriend = theUser.following.filter((one) => one == friendID);
  if (hasFriend.length > 0) {
    followingArr = theUser.following.filter((one) => one !== friendID);
    followersArr = userFriend.followers.filter((one) => one != USER_ID);
  } else {
    followingArr.push(friendID);
    followersArr.push(USER_ID);
  }
  await User.updateOne(
    { _id: friendID },
    {
      $set: {
        followers: followersArr,
      },
    }
  );
  await User.updateOne(
    { _id: USER_ID },
    {
      $set: {
        following: followingArr,
      },
    }
  );
  res.status(201).json({ followingArr });
};
module.exports = {
  createUser,
  loginUser,
  addRemoveFriend,
};
