const express = require("express");
const { body } = require("express-validator");

const isAuth = require("../middleware/isAuth");
const uploadImg = require("../middleware/uploadImg");
const authRoutes = require("../controllers/auth");

const router = express.Router();

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please use an unique and new email")
      .normalizeEmail(),
    body("password", "Create a strong password with special charcters and numbers")
      .isLength({ min: 6 })
      .isAlphanumeric()
      .trim(),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error(
            "The given passwords don't match each other."
          );
        }
        return true;
      }),
  ],
  uploadImg.single("img"),
  authRoutes.register
);

router.post("/login", authRoutes.login);

router.get("/account", isAuth, authRoutes.getAccount);

router.put(
  '/account',
  isAuth,
  [
    body('email')
      .isEmail()
      .withMessage('Please use an unique and new email')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 6 })
      .isAlphanumeric()
      .trim()
      .withMessage(
        'Create a strong password with special charcters and numbers'
      ),
    body('confirmPassword')
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error(
            "The given passwords don't match each other."
          )
        }
        return true
      }),
  ],
  uploadImg.single('img'),
  authRoutes.editAccount
)

router.post("/account/delete", isAuth, authRoutes.deleteUser);

module.exports = router;
