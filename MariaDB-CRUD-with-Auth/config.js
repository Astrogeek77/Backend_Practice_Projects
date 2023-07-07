const { config } = require("dotenv");
config();

module.exports = {
  PORT: process.env.PORT || 8080,
  maria_PASSWORD: process.env.MARIA_PASSWORD,
  maria_USER: process.env.MARIA_USER,
  maria_HOST: process.env.MARIA_HOST || "127.0.0.1",
  maria_PORT_DATABASE: process.env.PORT_DATABASE || 3306,
  maria_DATABASE: process.env.DATABASE,
  jwt_TOKEN: process.env.JWT_TOKEN,
};
