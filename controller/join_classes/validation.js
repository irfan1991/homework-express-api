const { body, validationResult } = require("express-validator");
const { join_classes, Sequelize } = require("../../models");
const { failed } = require("../../config/response");

exports.runValidator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(404).json(failed({ message: errors.array()[0].msg }));
  next();
};


exports.postValidator = [
  body("role", "role tidak boleh kosong")
    .isIn(['student', 'tutor','spv'])
    .withMessage("role tidak sesuai"),
];

exports.putValidator = [
  body("role", "role tidak boleh kosong")
    .isIn(['student', 'tutor','spv'])
    .withMessage("role tidak sesuai"),
];