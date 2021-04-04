const { body, validationResult } = require("express-validator");
const { materials, schedules, Sequelize } = require("../../models");
const { failed } = require("../../config/response");

exports.runValidator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(404).json(failed({ message: errors.array()[0].msg }));
  next();
};


exports.postValidator = [
  body("name", "nama material tidak boleh kosong")
    .notEmpty()
    .custom(async (value) => {
      const material = await materials.findOne({ where: { name: value } });
      if (material) {
        return Promise.reject("Nama material telah digunakan");
      }
    }),
  body("schedule_id", "schedule tidak boleh kosong")
    .notEmpty()
    .custom(async (value) => {
      const schedule_id = await schedules.findOne({ where: { id: value } });
      if (!schedule_id) return Promise.reject("Schedule tidak tersedia");
    }),
];

exports.putValidator = [
  body("name", "nama material tidak boleh kosong")
    .notEmpty()
    .custom(async (value, { req }) => {
      const material = await materials.findOne({
        where: { name: value, id: { [Sequelize.Op.ne]: req.body.id } },
      });
      if (material) return Promise.reject("Nama material telah digunakan");
    }),
  body("schedule_id", "schedule tidak boleh kosong")
    .notEmpty()
    .custom(async (value) => {
      const schedule_id = await schedules.findOne({ where: { id: value } });
      if (!schedule_id) return Promise.reject("Schedule tidak tersedia");
    }),
];