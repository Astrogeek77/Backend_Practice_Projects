const express = require("express");

const isAuth = require("../middleware/isAuth");
const uploadImg = require("../middleware/uploadImg");
const newsController = require("../controllers/news");

const router = express.Router();

router.get("/my-news", isAuth, newsController.getWtrittenNews);

router.get("/:newsId", newsController.getSingleNews);

router.get("/", newsController.getNews);

router.post(
  "/",
  isAuth,
  uploadImg.array("images[]"),
  newsController.createNews
);

router.put(
  "/:newsId",
  isAuth,
  uploadImg.array("images[]"),
  newsController.editNews
);

router.delete("/:newsId", isAuth, newsController.deleteNews);



module.exports = router;
