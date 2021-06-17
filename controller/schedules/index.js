const { success, failed } = require("../../config/response");
const { schedules, classes, materials, Sequelize, sequelize, } = require("../../models");

exports.get = async({ query }, res) => {
    const where = {};
    if (query.id) where.id = query.id;
    try {
        const data = await schedules.findAll({
            where,
            include: [classes]
        });
        return res.json(success({ message: "data schedule berhasil diterima", data }));
    } catch (error) {
        return res.json(failed({ data: error.message }));
    }
};

exports.show = async(req, res) => {
    const where = { id: req.params.id };

    try {
        const data = await schedules.findAll({
            where,
            include: [classes],
        });
        return res.json(success({ message: "data berhasil diterima", data: data }));
    } catch (error) {
        return res.json(failed({ message: "ERROR SYSTEM", data: error.message }));
    }
};

exports.classId = async(req, res) => {
    console.log(req);
    const where = { class_id: req.params.classId };

    try {
        const data = await schedules.findAll({
            where,
            include: [classes, materials],
        });
        return res.json(success({ message: "data berhasil diterima", data: data }));
    } catch (error) {
        return res.json(failed({ message: "ERROR SYSTEM", data: error.message }));
    }
};

exports.create = async({ body }, res) => {
    try {
        const payload = {
            name: body.name,
            class_id: body.class_id,
            start: body.start,
            end: body.end,
            code: body.code
        };
        console.log(payload)
        const data = await schedules.create(payload);
        return res.json(success({ message: "data berhasil ditambahkan", data }));
    } catch (error) {
        return res.json(failed({ data: error.message }));
    }
};

exports.update = async({ body }, res) => {
    try {
        const payload = {
            name: body.name,
            class_id: body.class_id,
            start: body.start,
            end: body.end,
            code: body.code,
        };
        const where = {
            id: body.id,
        };
        const data = await schedules.update(payload, { where });
        return res.json(
            success({
                message: "data berhasil diperbarui",
                data: {...where, ...payload },
            })
        );
    } catch (error) {
        return res.json(failed({ data: error.message }));
    }
};

exports.del = async(req, res) => {
    try {
        const where = {
            id: req.params.id,
        };
        const data = await schedules.destroy({ where });
        if (data)
            return res.json(
                success({
                    message: "data berhasil dihapus",
                    data,
                })
            );
        else throw "schedule tidak ditemukan";
    } catch (error) {
        return res.json(failed({ data: error.message }));
    }
};