const { connectDb } = require("../database/db");
const catchError = require("../helpers/catchError");
const error404 = require("../helpers/error404");

const message404 =  "No se ha encontrado esta noticia en la base de datos"

module.exports.createNews = catchError(async (req, res, next) => {
  const conn = await connectDb();
  const { title, content } = req.body;
  const { userId } = req;
  const results = await conn.query(
    `INSERT INTO entries (title, content, userId) \
        VALUES ("${title}", "${content}", ${userId})`
  );
  const images = req.files;
  if (images) {
    if (images.length > 0) {
      for await (const element of images) {
        const path = element.path.replace("\\", "/");
        await conn.query(`INSERT INTO images (url, newsId) \
           VALUES ("${path}", ${results.insertId})`);
      }
    }
  }
  res.status(200).json({
    message: "La noticia ha sido añadida correctamente",
    news : {title, content, images}
  });
});

module.exports.getSingleNews = catchError(async (req, res, next) => {
  const conn = await connectDb();
  const { newsId } = req.params;
  const news = await conn.query(`SELECT * FROM entries WHERE id = ${newsId}`);
  error404(news, message404);
  const images = await conn.query(
    `SELECT * FROM images WHERE newsId = ${newsId}`
  );
  const comments = await conn.query(
    `SELECT * FROM comments WHERE newsId = ${newsId}`
  );

  res.status(200).json({ news, images, comments });
});

module.exports.getNews = catchError(async (req, res, next) => {
  const conn = await connectDb();
  const news = await conn.query("SELECT * FROM entries");
  res.status(200).json(news);
});

module.exports.editNews = catchError(async (req, res, next) => {
  const conn = await connectDb();
  const { content, title, imagesToDelete } = req.body;
  const { newsId } = req.params;
  const { userId } = req;
  const news = await conn.query(
    `SELECT id FROM entries WHERE id= ${newsId} AND userId = ${userId}`
  );
  error404(news, message404);
   await conn.query(
    `UPDATE entries SET title = "${title}", content = "${content}" WHERE id = ${newsId} AND userId = ${userId}`
  );
  const images = req.files;
  if (images) {
    if (images.length > 0) {
      for await (const element of images) {
        const path = element.path.replace("\\", "/");

        await conn.query(`INSERT INTO images (url, newsId) \
             VALUES ("${path}", ${newsId})`);
      }
    }
  }
  if (imagesToDelete.length > 0) {
    for await (const element of JSON.parse(imagesToDelete)) {
      await conn.query(`DELETE FROM images WHERE id = ${element.id} `);
    }
  }
  res.status(200).json({
    message: "La noticia ha sido editada correctamente",
    news: {content, title, images},
  });
});

module.exports.deleteNews = catchError(async (req, res, next) => {
  const conn = await connectDb();
  const { newsId } = req.params;
  const { userId } = req;
  const news = await conn.query(
    `SELECT id FROM entries WHERE id = ${newsId} AND userId = ${userId}`
  );
  error404(news, message404);
  await conn.query(
    `DELETE FROM entries WHERE id = ${newsId} AND userId = ${userId}`
  );
  res.status(200).json({
    message: "La noticia ha sido eliminada correctamente",
    news,
  });
});

module.exports.getWtrittenNews = catchError(async (req, res, next) => {
  const conn = await connectDb();
  const { userId } = req;
  const news = await conn.query(
    `SELECT * FROM entries WHERE userID = ${userId}`
  );
  error404(news, message404);

  res.status(200).json({ news });
});
