const { body, validationResult } = require("express-validator");
const {  classes, Sequelize } = require("../../models");
const { failed } = require("../../config/response");

exports.runValidator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(404).json(failed({ message: errors.array()[0].msg }));
  next();
};


exports.postValidator = [
  body("name", "nama Class tidak boleh kosong")
    .notEmpty()
    .custom(async (value) => {
      const kelas = await classes.findOne({ where: { name: value } });
      if (kelas) {
        return Promise.reject("Nama Class telah digunakan");
      }
    }),
    body("code", "code Class tidak boleh kosong")
    .notEmpty()
    .custom(async (value) => {
      const kelas = await classes.findOne({ where: { code: value } });
      if (kelas) {
        return Promise.reject("code Class telah digunakan");
      }
    }),
    body("date_start","tanggal Mulai tidak boleh kosong").notEmpty().isDate({format: 'yyyy-mm-dd'}).withMessage("Format tanggal yyyy-mm-dd"),
    body("date_end","tanggal Selesai tidak boleh kosong").notEmpty().isDate({format: 'yyyy-mm-dd'}).withMessage("Format tanggal yyyy-mm-dd"),

  body("photo")
    .custom((value, {req}) => {
      if(req.file){
        if(req.file.mimetype === 'image/png'){
            return '.png'; 
        }else if(req.file.mimetype === 'image/jpeg'){
          return '.jpeg'; 
        }else if(req.file.mimetype === 'image/jpg'){
          return '.jpg'; 
        }else{
            return false; 
        }

      }else {
        return true;
      }
    })
.withMessage('Please only submit png/jpg/jpeg documents.'),
  
];

exports.putValidator = [
  body("name", "nama Class tidak boleh kosong")
    .notEmpty()
    .custom(async (value) => {
      const kelas = await classes.findOne({ where: { name: value } });
      if (kelas) {
        return Promise.reject("Nama Class telah digunakan");
      }
    }),
    body("code", "code Class tidak boleh kosong")
    .notEmpty()
    .custom(async (value) => {
      const kelas = await classes.findOne({ where: { code: value } });
      if (kelas) {
        return Promise.reject("code Class telah digunakan");
      }
    }),
    body("date_start","tanggal Mulai tidak boleh kosong").notEmpty().isDate({format: 'yyyy-mm-dd'}).withMessage("Format tanggal yyyy-mm-dd"),
    body("date_end","tanggal Selesai tidak boleh kosong").notEmpty().isDate({format: 'yyyy-mm-dd'}).withMessage("Format tanggal yyyy-mm-dd"),

  body("photo")
    .custom((value, {req}) => {
       if(req.file){
        if(req.file.mimetype === 'image/png'){
            return '.png'; 
        }else if(req.file.mimetype === 'image/jpeg'){
          return '.jpeg'; 
        }else if(req.file.mimetype === 'image/jpg'){
          return '.jpg'; 
        }else{
            return false; 
        }
         }else {
        return true;
      }
    })
.withMessage('Please only submit png/jpg/jpeg documents.'),
 
];