const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const catchError = require("../helpers/catchError");
const config = require("../config");
const validateResult = require("../helpers/validateResult");
const { connectDb } = require("../database/db");

module.exports.register = catchError(async (req, res, next) => {
    validateResult(req);
    const conn = await connectDb();
    const { username, email, password } = req.body;
    const img = req.file ? req.file.path.replace("\\", "/") : null;
    const saltRounds = 10;
    const sameUsername = await conn.query(
      `SELECT username FROM users WHERE username="${username}"`
    );
    if (sameUsername.length > 0) {
      const error = new Error(
        "Este nombre de usuario ya se encuentra actualmente en uso"
      );
      error.statusCode = 422;
      throw error;
    }
    const sameEmail = await conn.query(
      `SELECT email FROM users WHERE email="${email}"`
    );
    if (sameEmail.length > 0) {
      const error = new Error(
        "Este correo electrónico ya se encuentra actualmente en uso"
      );
      error.statusCode = 422;
      throw error;
    }
    const hp = await bcrypt.hash(password, saltRounds);
    const insertedUser =
      await conn.query(`INSERT INTO users (username, email, password, profilePic) \
    VALUES ("${username}", "${email}", "${hp}", "${img}")`);
    const user = await conn.query(
      `SELECT id, username, email, profilePic FROM users WHERE id= ${insertedUser.insertId}`
    );
    const jwtToken = jwt.sign(
      {
        userId: user[0].id,
      },
      config.jwt_TOKEN
    );
    res.status(200).json({ user, jwtToken });
});

module.exports.login = catchError(async (req, res, next) => {
    const conn = await connectDb();
    const { email, password } = req.body;
    const user = await conn.query(
      `SELECT id, username, email, profilePic, password FROM users WHERE email = "${email}"`
    );
    if (!user.length > 0) {
      const error = new Error("El usuario no ha sido encontrado");
      error.statusCode = 404;
      throw error;
    }
    const match = await bcrypt.compare(password, user[0].password);
    if (!match) {
      const error = new Error("La contraseña ingresada es incorrecta");
      error.statusCode = 404;
      throw error;
    }
    const jwtToken = jwt.sign(
      {
        userId: user[0].id,
      },
      config.jwt_TOKEN
    );
    const transformedUser = {
      username: user[0].username,
      profilePic: user[0].profilePic,
      id: user[0].id,
      email: user[0].email,
    };
    res.status(200).json({ transformedUser, jwtToken });
});

module.exports.getAccount = catchError(async (req, res, next) => {
    const conn = await connectDb();
    const { userId } = req;
    const user = await conn.query(
      `SELECT id, username, email, profilePic FROM users WHERE id = ${userId}`
    );
    res.status(200).json(user);
});

module.exports.editAccount = catchError(async (req, res, next) => {
    validateResult(req);
    const conn = await connectDb();
    const { userId } = req;
    const { username, email, password, actualPassword } = req.body;
    const sameUsername = await conn.query(
      `SELECT username, id FROM users WHERE username = "${username}"`
    );
    if (sameUsername.length > 0 && sameUsername[0].id !== userId) {
      const error = new Error(
        "Este nombre de usuario ya se encuentra actualmente en uso"
      );
      error.statusCode = 422;
      throw error;
    }
    const sameEmail = await conn.query(
      `SELECT email, id FROM users WHERE email = "${email}"`
    );
    if (sameEmail.length > 0 && sameEmail[0].id !== userId) {
      const error = new Error("Este email ya se encuentra actualmente en uso");
      error.statusCode = 422;
      throw error;
    }
    const user = await conn.query(`SELECT * FROM users WHERE id = ${userId}`)

    const match = await bcrypt.compare(actualPassword, user[0].password);
    if (!match) {
      const error = new Error("La contraseña ingresada es incorrecta");
      error.statusCode = 404;
      throw error;
    }
    const img = req.file ? req.file.path.replace("\\", "/") : user[0].profilePic;
    const saltRounds = 10;
    const hp = await bcrypt.hash(password, saltRounds);
    const results = await conn.query(
      `UPDATE users SET username="${username}", email = "${email}", profilePic = "${img}", password = "${hp}" WHERE id = ${userId}`
    );
    res.status(200).json({
      message: "Los datos del usuario se han actualizado correctamente",
      user: {usename, email, img},
    });
});

module.exports.deleteUser = catchError(async (req, res, next) => {
    const conn = await connectDb();
    const { userId } = req;
    const user = await conn.query(
      `SELECT password FROM users WHERE id = ${userId}`
    );
    const { password } = req.body;
    const match = await bcrypt.compare(password, user[0].password);
    if (!match) {
      const error = new Error("La contraseña ingresada es incorrecta");
      error.statusCode = 404;
      throw error;
    }
    const results = await conn.query(`DELETE FROM users WHERE id = ${userId}`);
    res.status(200).json({
      message: "El usuario se ha eliminado de forma correcta",
      user,
    });
});
