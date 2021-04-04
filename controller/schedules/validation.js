const { body, validationResult } = require("express-validator");
const { schedules, Sequelize } = require("../../models");
const { failed } = require("../../config/response");

exports.runValidator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(404).json(failed({ message: errors.array()[0].msg }));
  next();
};


exports.postValidator = [
  body("name", "nama schedule tidak boleh kosong")
    .notEmpty()
    .custom(async (value) => {
      const schedule = await schedules.findOne({ where: { name: value } });
      if (schedule) {
        return Promise.reject("Nama schedule telah digunakan");
      }
    }),
    body("code").notEmpty().withMessage("Code tidak boleh kosong"),
    body("start").notEmpty().withMessage("Code tidak boleh kosong")
    .isDate({format: 'yyyy-mm-dd'}).withMessage("Format tanggal yyyy-mm-dd"),
    body("end").notEmpty().withMessage("Code tidak boleh kosong")
    .isDate({format: 'yyyy-mm-dd'}).withMessage("Format tanggal yyyy-mm-dd"),
  
];

exports.putValidator = [
  body("name", "nama schedule tidak boleh kosong")
    .notEmpty()
    .custom(async (value, { req }) => {
      const schedule = await schedules.findOne({
        where: { name: value, id: { [Sequelize.Op.ne]: req.body.id } },
      });
      if (schedule) return Promise.reject("Nama schedule telah digunakan");
    }),
   body("code").notEmpty().withMessage("Code tidak boleh kosong"),
    body("start").notEmpty().withMessage("Code tidak boleh kosong")
    .isDate({format: 'yyyy-mm-dd'}).withMessage("Format tanggal yyyy-mm-dd"),
    body("end").notEmpty().withMessage("Code tidak boleh kosong")
    .isDate({format: 'yyyy-mm-dd'}).withMessage("Format tanggal yyyy-mm-dd"),
  
];