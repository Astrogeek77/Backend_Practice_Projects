const express = require("express");
const path = require("path");

const newsRoutes = require("./routes/news");
const authRoutes = require("./routes/auth");
const commentsRoutes = require("./routes/comments");
const config = require("./config");
const { createDb } = require("./database/db");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use(authRoutes);
app.use("/news", newsRoutes);
app.use("/comments", commentsRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

app.use("/images", express.static(path.join(__dirname, "images")));

createDb()
  .then(() => {
    app.listen(config.PORT);
    console.log("DB connected :)");
  })
  .catch((err) => {
    console.log(err);
  })
  .finally((conn) => {
    if (conn) conn.close();
  });
