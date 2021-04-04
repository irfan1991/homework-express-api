const { body, validationResult } = require("express-validator");
const { users, Sequelize } = require("../../models");
const { failed } = require("../../config/response");

exports.runValidator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json(failed({ message: errors.array()[0].msg }));
  }
  next();
};

const standard = [
  body("name", "nama tidak boleh kosong").notEmpty(),
  
];

exports.postValidator = [
  ...standard,
  body("phone")
    .notEmpty()
    .withMessage("phone tidak boleh kosong")
    .custom(async (value) => {
      const user = await users.findOne({
        where: { phone: value },
      });
      if (user) {
        return Promise.reject("Nomor telepon sudah digunakan");
      }
    }),

    body("password")
    .notEmpty()
    .withMessage("password tidak boleh kosong")
    .isLength({ min: 8 })
    .withMessage("password minimal 8 karakter"),

    body("birthdate").notEmpty().isDate({format: 'yyyy-mm-dd'}).withMessage("Format tanggal yyyy-mm-dd"),

    body("email")
    .notEmpty()
    .withMessage("email tidak boleh kosong")
    
    .custom(async (value) => {
      const user = await users.findOne({
        where: { email: value },
      });
      if (user) {
        return Promise.reject("email sudah digunakan");
      }
    }),
  
];

exports.putValidator = [
  body("id", "id tidak boleh kosong")
    .notEmpty()
    .custom(async (value) => {
      const user = await users.findByPk(value);
      if (!user) return Promise.reject("User tidak ditemukan");
    }),
  ...standard,
  body("phone")
    .notEmpty()
    .withMessage("phone tidak boleh kosong")
    .custom(async (value, { req }) => {
      const user = await users.findOne({
        where: { phone: value, id: { [Sequelize.Op.ne]: req.body.id } },
      });
      if (user) {
        return Promise.reject("Nomor telepon sudah digunakan orang lain");
      }
    }),
    body("password")
    .isLength({ min: 8 })
    .withMessage("password minimal 8 karakter"),

    body("email")
    .notEmpty()
    .withMessage("email tidak boleh kosong")
    .custom(async (value, { req }) => {
      const user = await users.findOne({
        where: { email: value, id: { [Sequelize.Op.ne]: req.body.id } },
      });
      if (user) {
        return Promise.reject("Email sudah digunakan orang lain");
      }
    }),
  
];