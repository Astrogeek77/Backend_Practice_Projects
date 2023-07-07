const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const bcryptSalt = 10;
const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');
// dotenv.config();
const secret = process.env.SECRET_KEY;



const register = async (req, res) => {

  const { firstname, lastname, email, password } = req.body;

  try {
    //existing user check
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      res.status(400).send({ message: 'User already exists' });
    }

    //hashed password
    const hashedPassword = await bcrypt.hash(password, bcryptSalt);

    //user create
    const result = await userModel.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashedPassword
    });

    //token generate
    const token = jwt.sign({ email: result.email, id: result._id }, secret);
    res.status(201).json({ user: result, token: token });

  }
  catch (error) {
    console.log('====================================');
    console.log("something went wrong");
    console.log('====================================');
    res.status(500).send(error);
  }
}

const login = async (req, res) => {

  //Extract email and password from request body
  const { email, password } = req.body;

  //Find user by email
  try {

    const user = await userModel.findOne({ email: email });
    if (!user) {
      res.status(400).json({ message: 'User does not exist' });
    }

    //Check password
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      res.status(400).json({ message: 'Invalid password' });
    }

    //Generate token
    const token = jwt.sign({ email: user.email, id: user._id }, secret);
    res.status(200).json({ user: user, token: token });

  }
  catch (error) {
    console.log('====================================');
    console.log("something went wrong");
    console.log('====================================');
    res.status(500).send(error);
  }


}

module.exports = { register, login };
