const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const UserRoutes = require("./routes/User");
const PostRoutes = require("./routes/Post");
require("dotenv").config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/", UserRoutes); //Routes for login signup
app.use("/posts/", PostRoutes); //Routes for login signup

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Running on port ${process.env.PORT} and connected to DB `);
    });
  })
  .catch((e) => console.log(e));
