const jwt = require('jsonwebtoken');

const config = require("../config")

module.exports = async (req,res,next) => {
    const authHeader = req.get('Authorization');
    try {
    if (!authHeader) {
      const error = new Error('Session Expired.');
      error.statusCode = 401;
      throw error;
    }
    const token = authHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, config.jwt_TOKEN);
    if (!decodedToken) {
      const error = new Error('Invalid Credentails or token');
      error.statusCode = 401;
      throw error;
    }
    req.userId = decodedToken.userId;
    next();
    } catch (err) {
      err.statusCode = 500;
      next(err);
    }   
}