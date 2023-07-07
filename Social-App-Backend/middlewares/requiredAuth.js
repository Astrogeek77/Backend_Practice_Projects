const jwt = require("jsonwebtoken");

const requiredAuth = async (req, res, next) => {
  try {
    //we are going to be dealing with Bearer tokens
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(400).json({ message: "Please log in or register " });
    }
    const token = authorization.split(" ")[1];
    //verifying the token
    const { id } = jwt.verify(token, process.env.SECRET);
    req.body.USER_ID = id;
    next();
  } catch (err) {
    return res.status(400).json({ message: "Please log in or register " });
  }
};

module.exports = {
  requiredAuth,
};
