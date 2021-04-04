const { success, failed } = require("../../config/response");
const { join_classes, users, classes, schedules, sequelize } = require("../../models");

exports.create = async (req, res) => {
  if (!req.body.join_classes)
    return res.json(failed({ message: "data join_class tidak boleh kosong" }));
  const join_class = req.body.join_classes;
  const payload = join_class.map((join_class) => ({
    users_id: join_class.users_id,
    class_id: join_class.class_id,
    role: join_class.role,
  }));
  try {
    const data = await join_classes.bulkCreate(payload);
    return res.json(success({ message: "data berhasil ditambahkan", data }));
  } catch (error) {
    return res.json(failed({ message: "ERROR SYSTEM", data: error }));
  }
};

exports.get = async (req, res) => {
  try {
    const data = await users.findAll({
      attributes: ["name", "phone"],
      group: ["id", "join_classes.class_id"],
      join_class: [
        "name",
        [sequelize.fn("sum", sequelize.col("join_classes.role")), "DESC"],
      ],
      include: [
        {
          model: join_classes,
          attributes: [
            [sequelize.fn("count", sequelize.col("join_classes.id")), "jumlah_join"],
          ],
          include: {
            model: classes,
            attributes: ["name"],
            include: { model: schedules, attributes: ["name","start","end"] },
          },
        },
      ],
    });
    return res.json(success({ message: "data berhasil ditemukan", data }));
  } catch (error) {
    return res.json(failed({ message: "ERROR SYSTEM", data: error }));
  }
};