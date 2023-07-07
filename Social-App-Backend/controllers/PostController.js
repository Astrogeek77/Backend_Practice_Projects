const User = require("../models/User");
const Post = require("../models/Post");
const { default: mongoose } = require("mongoose");

const createPost = async (req, res) => {
  const { USER_ID, title, subtitle, imgUrl } = req.body;

  if ((!USER_ID || !title, !imgUrl)) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const newpost = await Post.create({
    title,
    imgUrl,
    subtitle,
    userId: USER_ID,
  });
  if (newpost) {
    return res.status(201).json(newpost);
  } else {
    return res
      .status(400)
      .json({ message: "Cant create this post now Sorry :(" });
  }
};

const getPosts = async (req, res) => {
  const { USER_ID } = req.body;
  if (mongoose.isValidObjectId(USER_ID)) {
    const postArray = await Post.find({ userId: USER_ID });
    if (postArray) {
      return res.status(200).json(postArray);
    }
  }
};
const getOnePost = async (req, res) => {
  const { USER_ID } = req.body;
  const { id } = req.params;
  if (mongoose.isValidObjectId(USER_ID)) {
    const post = await Post.findOne({ userId: USER_ID, _id: id });
    if (post) {
      return res.status(200).json(post);
    } else {
      return res.status(404).json({ message: "No such post" });
    }
  }
};
const deletePost = async (req, res) => {
  const { USER_ID } = req.body;
  const { id } = req.params;

  if (mongoose.isValidObjectId(USER_ID) && mongoose.isValidObjectId(id)) {
    const deletePost = await Post.findOneAndDelete({
      userId: USER_ID,
      _id: id,
    });
    if (deletePost) {
      return res.status(200).json({ message: "post deleted successfuly" });
    } else {
      return res.status(400).json({ message: "Error deleting post" });
    }
  }
};
const likeDislikePost = async (req, res) => {
  const { id } = req.params;
  const { USER_ID } = req.body;
  let likesArr = [];
  if (mongoose.isValidObjectId(USER_ID) && mongoose.isValidObjectId(id)) {
    const post = await Post.findById(id);
    likesArr = post.likes;
    const found = likesArr.filter((one) => one == USER_ID)[0];
    if (found) {
      likesArr = likesArr.filter((one) => one != USER_ID);
    } else {
      likesArr.push(USER_ID);
    }
    await Post.updateOne(
      { _id: post._id },
      {
        $set: {
          likes: likesArr,
        },
      }
    );
    const post1 = await Post.findById(id);
    return res.status(202).json(post1);
  } else {
    return res.status(404).json({ message: "No such post" });
  }
};

module.exports = {
  createPost,
  getPosts,
  deletePost,
  getOnePost,
  likeDislikePost,
};
