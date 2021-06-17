const { body, validationResult } = require("express-validator");
const { join_classes, Sequelize } = require("../../models");
const { failed } = require("../../config/response");
const Op = require('sequelize').Op;

exports.runValidator = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(404).json(failed({ message: errors.array()[0].msg }));
    next();
};


exports.postValidator = [
    // body("class_id", "class tidak boleh kosong")
    // // .isIn(['student', 'tutor', 'spv'])
    // // .withMessage("role tidak sesuai")
    // .custom(async(value) => {
    //     const tutor = await join_classes.findOne({
    //         where: {
    //             // class_id: {
    //             //     [Op.ne]: value
    //             // },
    //             class_id: value,
    //             // role: 'tutor'
    //         }
    //     });
    //     console.log(JSON.stringify(tutor));
    //     if (JSON.stringify(tutor).role === 'tutor') {
    //         return Promise.reject(`${JSON.stringify(tutor).role}`);
    //     }
    // }),
];

exports.putValidator = [
    body("role", "role tidak boleh kosong")
    .isIn(['student', 'tutor', 'spv'])
    .withMessage("role tidak sesuai"),
];