const express = require("express");

const isAuth = require("../middleware/isAuth");
const commentsController = require("../controllers/comments");

const router = express.Router();

router.post("/", isAuth, commentsController.createComment);

router.put("/", isAuth, commentsController.editComment);

router.delete("/:commentId", isAuth, commentsController.deleteComment);

module.exports = router;
