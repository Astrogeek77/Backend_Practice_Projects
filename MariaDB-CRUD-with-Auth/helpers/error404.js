module.exports = (obj, message) => {
  if ((!obj.length > 0)) {
    const error = new Error(message);
    error.statusCode = 404;
    throw error;
  }
};
