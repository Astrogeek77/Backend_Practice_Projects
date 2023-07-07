const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const secret = process.env.SECRET_KEY;

const auth = (req, res, next) => {

  try {
    const token = req.headers.authorization.split(' ')[1];

    if (token) {

      const user = jwt.verify(token, secret);
      req.id = user._id;
    }
    else {
      return res.status(401).json({ message: 'No token provided' });
    }

    next();
  }
  catch (error) {
    res.status(401).json({ message: "UnAuthorized User" });
  }
}


module.exports = auth;
