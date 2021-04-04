const { success, failed } = require("../../config/response");
const { presences, schedules, join_classes, users, classes, sequelize } = require("../../models");

exports.create = async (req, res) => {
  if (!req.body.presences)
    return res.json(failed({ message: "data presence tidak boleh kosong" }));
  const presence = req.body.presences;
  const payload = presence.map((presence) => ({
    schedules_id: presence.schedules_id,
    join_class_id: presence.join_class_id,
    created_at: presence.created_at,
  }));
  try {
    const data = await presences.bulkCreate(payload);
    return res.json(success({ message: "data berhasil ditambahkan", data }));
  } catch (error) {
    return res.json(failed({ message: "ERROR SYSTEM", data: error }));
  }
};

exports.get = async (req, res) => {
  try {
    const data = await schedules.findAll({
      attributes: ["name", "start","end"],
      group: ["id", "presences.join_class_id"],
      presence: [
        "crated_at",
        [sequelize.fn("sum", sequelize.col("presences.created_at")), "DESC"],
      ],
      include: [
        {
          model: presences,
          attributes: [
            [sequelize.fn("sum", sequelize.col("presences.created_at")), "jumlah_kehadiran"],
          ],
          include: {
            model: join_classes,
            attributes: ["role"],
            include: { model: users, attributes: ["name"] },
          },
        },
      ],
    });
    return res.json(success({ message: "data berhasil ditemukan", data }));
  } catch (error) {
    return res.json(failed({ message: "ERROR SYSTEM", data: error }));
  }
};