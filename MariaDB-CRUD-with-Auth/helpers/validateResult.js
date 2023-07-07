const { validationResult } = require("express-validator");

module.exports = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Algo fallo!");
        error.data = errors.array();
        error.statusCode = 422;
        throw error;
      }
}
    