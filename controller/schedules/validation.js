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
   body("name", "nama Schedule tidak boleh kosong")
    .notEmpty()
    .custom(async (value) => {
      const schedule = await schedules.findOne({ where: { name: value } });
      if (schedule) {
        return Promise.reject("Nama Schedule telah digunakan");
      }
    }),
    body("code", "code Schedule tidak boleh kosong")
    .notEmpty()
    .custom(async (value) => {
      const schedule = await schedules.findOne({ where: { code: value } });
      if (schedule) {
        return Promise.reject("code Schedule telah digunakan");
      }
    }),
  body("start","Waktu Mulai tidak boleh kosong").notEmpty(),
  
  body("end","Waktu Selesai tidak boleh kosong").notEmpty(),
  
];

exports.putValidator = [
   body("name", "nama Schedule tidak boleh kosong")
    .notEmpty()
    .custom(async (value) => {
      const schedule = await schedules.findOne({ where: { name: value } });
      if (schedule) {
        return Promise.reject("Nama Schedule telah digunakan");
      }
    }),
    body("code", "code Schedule tidak boleh kosong")
    .notEmpty()
    .custom(async (value) => {
      const schedule = await schedules.findOne({ where: { code: value } });
      if (schedule) {
        return Promise.reject("code Schedule telah digunakan");
      }
    }),

    body("start","Waktu Mulai tidak boleh kosong").notEmpty().isDate({format: 'yyyy-mm-dd'}).withMessage("Format tanggal mulai yyyy-mm-dd"),
  
  body("end","Waktu Selesai tidak boleh kosong").notEmpty().isDate({format: 'yyyy-mm-dd'}).withMessage("Format tanggal  selesai yyyy-mm-dd"),
  
];