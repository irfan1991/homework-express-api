const { body, validationResult } = require("express-validator");
const { schedules, classes, Sequelize } = require("../../models");
const { failed } = require("../../config/response");

exports.runValidator = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(404).json(failed({ message: errors.array()[0].msg }));
    next();
};


exports.postValidator = [

    // body("start", "Waktu Mulai tidak boleh kosong").notEmpty()
    // .isISO8601('yyyy:mm:dd hh:mm:ss')
    // .matches('/^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/)
    //     .withMessage('start must be in correct format yyyy:mm:dd hh:mm:ss'),

    body("name", "nama Schedule tidak boleh kosong")
    .notEmpty()
    .custom(async(value) => {
        const schedule = await schedules.findOne({ where: { name: value } });
        if (schedule) {
            return Promise.reject("Nama Schedule telah digunakan");
        }
    }),
    body("code", "code Schedule tidak boleh kosong")
    .notEmpty()
    .custom(async(value) => {
        const schedule = await schedules.findOne({ where: { code: value } });
        if (schedule) {
            return Promise.reject("code Schedule telah digunakan");
        }
    }),
    body("start", "Waktu Mulai tidak boleh kosong").notEmpty(),
    //.isISO8601('yyyy-mm-dd')
    //.matches('^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$')
    //.withMessage('start must be in correct format yyyy-mm-dd hh:mm:ss'),

    body("end", "Waktu Selesai tidak boleh kosong").notEmpty(),

    body("class_id", "class tidak boleh kosong")
    .notEmpty()
    .custom(async(value) => {
        const class_id = await classes.findOne({ where: { id: value } });
        if (!class_id) return Promise.reject("Kelas tidak tersedia");
    }),

];

exports.putValidator = [
    body("name", "nama Schedule tidak boleh kosong")
    .notEmpty(),
    // .custom(async(value) => {
    //     const schedule = await schedules.findOne({ where: { name: value } });
    //     if (schedule) {
    //         return Promise.reject("Nama Schedule telah digunakan");
    //     }
    // }),
    body("code", "code Schedule tidak boleh kosong")
    .notEmpty(),
    // .custom(async(value) => {
    //     const schedule = await schedules.findOne({ where: { code: value } });
    //     if (schedule) {
    //         return Promise.reject("code Schedule telah digunakan");
    //     }
    // }),

    body("start", "Waktu Mulai tidak boleh kosong").notEmpty(),
    //.isDate({ format: 'yyyy-mm-dd' }).withMessage("Format tanggal mulai yyyy-mm-dd"),

    body("end", "Waktu Selesai tidak boleh kosong").notEmpty(),
    //.isDate({ format: 'yyyy-mm-dd' }).withMessage("Format tanggal  selesai yyyy-mm-dd"),
    body("class_id", "class tidak boleh kosong")
    .notEmpty()
    .custom(async(value) => {
        const class_id = await classes.findOne({ where: { id: value } });
        if (!class_id) return Promise.reject("Kelas tidak tersedia");
    }),
];