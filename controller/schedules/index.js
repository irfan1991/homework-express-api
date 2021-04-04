const { success, failed } = require("../../config/response");
const { schedules , classes, Sequelize,sequelize, } = require("../../models");

exports.get = async ({ query }, res) => {
  const where = {};
  if (query.id) where.id = query.id;
  try {
    const data = await schedules.findAll({
      where,
      include: [classes],
    });
    return res.json(success({ message: "data buku berhasil diterima", data }));
  } catch (error) {
    return res.json(failed({ data: error }));
  }
};

exports.show = async ( req, res) => {
  const where = {id : req.params.id};
 
  try {
    const data = await schedules.findAll({
      where,
      include: [classes],
    });
    return res.json(success({ message: "data berhasil diterima", data: data }));
  } catch (error) {
    return res.json(failed({ message: "ERROR SYSTEM", data: error }));
  }
};

exports.create = async ({ body }, res) => {
  try {
    const payload = {
      name: body.name,
      class_id : body.class_id,
      start : body.start,
      end : body.end,
      code : body.code
    };
    const data = await schedules.create(payload);
    return res.json(success({ message: "data berhasil ditambahkan", data }));
  } catch (error) {
    return res.json(failed({ data: error }));
  }
};

exports.update = async ({ body }, res) => {
  try {
    const payload = {
      name: body.name,
      class_id : body.class_id,
      start : body.start,
      end : body.end,
    };
    const where = {
      id: body.id,
    };
    const data = await schedules.update(payload, { where });
    return res.json(
      success({
        message: "data berhasil diperbarui",
        data: { ...where, ...payload },
      })
    );
  } catch (error) {
    return res.json(failed({ data: error }));
  }
};

exports.del = async ({ body }, res) => {
  try {
    const where = {
      id: body.id,
    };
    const data = await schedules.destroy({ where });
    if (data)
      return res.json(
        success({
          message: "data berhasil dihapus",
          data,
        })
      );
    else throw "Buku tidak ditemukan";
  } catch (error) {
    return res.json(failed({ data: error }));
  }
};