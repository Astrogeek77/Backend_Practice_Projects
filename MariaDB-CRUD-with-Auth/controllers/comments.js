const catchError = require("../helpers/catchError");
const { connectDb } = require("../database/db");
const error404 = require("../helpers/error404");

const message404 = "No se ha encontrado este comentario en la base de datos";

module.exports.createComment = catchError(async (req, res, next) => {
  const conn = await connectDb();
  const { comment, newsId } = req.body;
  const { userId } = req;
  const results = await conn.query(
    `INSERT INTO comments (text, newsId, userId) \
              VALUES ("${comment}", ${newsId}, ${userId})`
  );
  res.status(200).json({
    comment,
    message: "El comentario ha sido añadido de forma exitosa",
  });
});

module.exports.editComment = catchError(async (req, res, next) => {
  const conn = await connectDb();
  const { comment, commentId } = req.body;
  const { userId } = req;
  const results = await conn.query(
    `UPDATE comments SET text = "${comment}" WHERE id = ${commentId} AND userId = ${userId}`
  );
  res.status(200).json({
    comment,
    message: "El comentario fue actualizado de forma exitosa",
  });
});

module.exports.deleteComment = catchError(async (req, res, next) => {
  const conn = await connectDb();
  const { commentId } = req.params;
  const { userId } = req;
  const comment = await conn.query(
    `SELECT * FROM comments WHERE id = ${commentId}`
  );
  error404(comment, message404);
  const results = await conn.query(
    `DELETE FROM comments WHERE id = ${commentId} AND userId = ${userId}`
  );
  res.status(200).json({
    results,
    message: "El comentario fue eliminado de forma exitosa",
  });
});
