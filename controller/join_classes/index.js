const { success, failed } = require("../../config/response");
const { join_classes, users, classes, schedules, sequelize } = require("../../models");

exports.create = async(req, res) => {
    if (!req.body.class_id)
        return res.json(failed({ message: "data class tidak boleh kosong" }));

    // if (req.body.role === "tutor") {
    //     const a;
    //     join_classes.findOne({ where: { class_id: req.body.class_id } }).then(data => {
    //         return a = res.json(failed({ message: `${data.toJSON()}` }));
    //     });
    //     return res.json(failed({ message: `tutor udah ada ${a}` }));
    // }

    //  const join_class = req.body.join_classes;
    ///  const payload = join_class.map((join_class) => ({
    // users_id: join_class.users_id,
    // class_id: join_class.class_id,
    // role: join_class.role,
    // users_id: req.body.users_id,
    // class_id: req.body.class_id,
    // role: req.body.role,
    //  }));
    const payload = {
        users_id: req.body.users_id,
        class_id: req.body.class_id,
        role: req.body.role,
    };
    try {
        //  const data = await join_classes.bulkCreate(payload);
        const data = await join_classes.create(payload);
        return res.json(success({ message: "data berhasil ditambahkan", data }));
    } catch (error) {
        return res.json(failed({ message: "ERROR SYSTEM", data: error }));
    }
};



// exports.getUser = async(req, res) => {
//     try {
//         const data = await users.findAll({
//             attributes: ["id"],
//             group: ["id", "join_classes.class_id", "join_classes.users_id"],
//             join_class: [
//                 "name", [sequelize.fn("sum", sequelize.col("join_classes.role")), "DESC"],
//             ],
//             include: [{
//                 model: join_classes,
//                 attributes: [
//                     [sequelize.fn("count", sequelize.col("join_classes.id")), "jumlah_join"],
//                     ["users_id"]
//                 ],
//                 include: [{
//                         model: classes,
//                         include: { model: schedules, attributes: ["name", "start", "end"] },
//                     },
//                     {
//                         model: users,
//                         attributes: ["name", "id", "role"],
//                         order: {
//                             order: '`createdAt` DESC'
//                         }
//                     },
//                 ]
//             }, ],
//         });
//         return res.json(success({ message: "data berhasil ditemukan", data }));
//     } catch (error) {
//         return res.json(failed({ message: "ERROR SYSTEM", data: error }));
//     }
// };
exports.get = async(req, res) => {
    try {
        const data = await classes.findAll({
            // attributes: ["name", "phone"],
            group: ["id", "join_classes.users_id"],
            join_class: [
                "name", [sequelize.fn("sum", sequelize.col("join_classes.user_id")), "DESC"],

            ],
            include: [{
                model: join_classes,
                attributes: [
                    [sequelize.fn("count", sequelize.col("join_classes.id")), "jumlah_join"],
                    // "users_id"
                ],
                include: {

                    model: users,
                    attributes: ["name", "id", "role"],

                    where: {
                        // role: 'tutor'
                    },
                    order: {
                        order: '`createdAt` DESC'
                    }
                },
            }, ],
        });
        return res.json(success({ message: "data berhasil ditemukan", data }));
    } catch (error) {
        return res.json(failed({ message: "ERROR SYSTEM", data: error }));
    }


};


exports.getUser = async(req, res) => {
    try {
        const data = await classes.findAll({
            // attributes: ["name", "phone"],
            group: ["id", "join_classes.class_id"],
            join_class: [
                "name", [sequelize.fn("sum", sequelize.col("join_classes.user_id")), "DESC"],

            ],
            include: [{
                model: join_classes,
                attributes: [
                    // [sequelize.fn("count", sequelize.col("join_classes.users_id")), "jumlah_join"],
                    [
                        sequelize.literal(`(SELECT COUNT(*) FROM join_classes  WHERE class_id = classes.id
                        )`),
                        'jumlah_join'
                    ]
                ],
                include: {

                    model: users,
                    attributes: ["name", "id", "role"],


                    order: {
                        order: '`createdAt` DESC'
                    }
                },
                where: {
                    users_id: req.params.id
                },
            }, ],
        });
        return res.json(success({ message: "data berhasil ditemukan", data }));
    } catch (error) {
        return res.json(failed({ message: "ERROR SYSTEM", data: error }));
    }


};