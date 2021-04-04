const { success, failed } = require("../../config/response");
const { users } = require("../../models");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");

exports.profile = async ({ auth }, res) => {
  try {
    const req = await users.findOne({ where: { id: auth.user.id } });
    return res.json(success({ data: req }));
  } catch (error) {
    return res.json(failed({ message: "invalid data user", data: error }));
  }
};

exports.updateProfile = async ({ auth, body }, res) => {
  const payload = {};
  if (body.name) payload.name = body.name;
  if (body.place_birth) payload.place_birth = body.place_birth;
  if (body.phone) payload.phone = body.phone;
  if (body.email) payload.email = body.email;
  if (body.birthdate) payload.birthdate = body.birthdate;
  if (body.last_study) payload.last_study = body.last_study;
  if (body.institution) payload.institution = body.institution;
  if (body.current_job) payload.current_job = body.current_job;
   if (body.sosmed) payload.sosmed = body.sosmed;
  if (body.password) {
    const user = await users.findOne({ where: { id: auth.user.id } });
    if (compareSync(body.password, user.password))
      return res.json(
        failed({ message: "password tidak boleh sama dengan yang lama" })
      );
    else {
      const salt = genSaltSync(8);
      payload.password = hashSync(body.password, salt);
    }
  }
  try {
    const req = await users.update(payload, { where: { id: auth.user.id } });
    const userUpdate = await users.findOne({ where: { id: auth.user.id } });
    return res.json(success({ message: "profile berhasil diubah" ,data : userUpdate}));
  } catch (error) {
    return res.json(failed({ message: "ERROR SYSTEM", data: error }));
  }
};