const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    following: {
      type: Array,
      required: false,
      default: [],
    },
    followers: {
      type: Array,
      required: false,
      default: [],
    },
  },
  { timestamps: true }
);

userSchema.statics.login = async function login(email, password) {
  if (!email || !password) throw Error("All fields are required");

  const user = await this.findOne({ email: email });
  if (!user) {
    throw Error("User dose not exists");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }
  return user;
};
userSchema.statics.signup = async function signup(email, password) {
  if (!email || !password) throw Error("All fields are required");

  const user = await this.findOne({ email: email });
  if (user) {
    throw Error("User already exists");
  }

  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);

  const newUser = this.create({ email, password: hash });
  return newUser;
};

module.exports = mongoose.model("user", userSchema);
