const { success, failed } = require("../../config/response");
const { materials , schedules } = require("../../models");
const path = require('path')
const fs = require('fs')

exports.get = async ({ query }, res) => {
  const where = {};
  if (query.id) where.id = query.id;
  try {
    const data = await materials.findAll({
      where,
      include: [schedules],
    });
    return res.json(success({ message: "data material berhasil diterima", data }));
  } catch (error) {
    return res.json(failed({ data: error }));
  }
};

exports.show = async ( req, res) => {
  const where = {id : req.params.id};
 
  try {
    const data = await materials.findAll({
      where,
      include: [schedules],
    });
    return res.json(success({ message: "data berhasil diterima", data: data }));
  } catch (error) {
    return res.json(failed({ message: "ERROR SYSTEM", data: error }));
  }
};

exports.create = async (req, res) => {
  try {
    const payload = {
      name: req.body.name,
      
    };
    if (req.file) {

            let tmp_path = req.file.path;
            let originalExt = req.file.originalname.split('.')
            [req.file.originalname.split('.').length - 1];
            let filename = req.file.filename + '.' + originalExt;
            let target_path = path.resolve(path.resolve(__dirname, '../..'), `public/file/${filename}`);

            const src = fs.createReadStream(tmp_path);

            const dest = fs.createWriteStream(target_path);

            src.pipe(dest);

            src.on('end', async () => {
                
                payload.file = filename;
                const data = await materials.create(payload);
                return res.json(success({ message: "data berhasil ditambahkan", data }));
              
            });

            src.on('error', async () => {
                if (err && err.name === 'ValidationError') {
                    return res.json({
                        error : 1,
                        message : err.message,
                        fields : err.errors
                    });
                }
               // next(err)
                next(err)
            })
            
        } else {

            const data = await materials.create(payload);
            return res.json(success({ message: "data berhasil ditambahkan", data }));
            
        }
    
  } catch (error) {
    return res.json(failed({ data: error.message }));
  }
};

exports.update = async (req, res) => {
  try {
    const payload = {
      name: req.body.name,
   
    };
    const where = {
      id: req.body.id,
    };
    if (req.file) {

            let tmp_path = req.file.path;
            let originalExt = req.file.originalname.split('.')
            [req.file.originalname.split('.').length - 1];
            let filename = req.file.filename + '.' + originalExt;
            let target_path = path.resolve(path.resolve(__dirname, '../..'), `public/file/${filename}`);

            const src = fs.createReadStream(tmp_path);

            const dest = fs.createWriteStream(target_path);

            src.pipe(dest);

            src.on('end', async () => {
                const material = await materials.findOne({ where});
                
                let base_url = path.resolve(__dirname, '../..');
                let currentImage = `${base_url}/public/file/${material.file}`;
              console.log(currentImage)
                if (fs.existsSync(currentImage)) {
                    fs.unlinkSync(currentImage)    
                }

              payload.file = filename;
               const data = await materials.update(payload, { where });
                return res.json(
                  success({
                    message: "data berhasil diperbarui",
                    data: { ...where, ...payload },
                  })
                );
              
            });

            src.on('error', async () => {

                next(err)
            })
            
        } else {

           const data = await materials.update(payload, { where });
              return res.json(
                success({
                  message: "data berhasil diperbarui",
                  data: { ...where, ...payload },
                })
              );
            
        }

    
  } catch (error) {
    return res.json(failed({ data: error }));
  }
};

exports.del = async ({body}, res) => {

  console.log(body)
  try {
    const where = {
      id: body.id,
    };
    const material = await materials.findOne({ where});

                let base_url = path.resolve(__dirname, '../..');
                let currentImage = `${base_url}/public/file/${material.file}`;

                if (fs.existsSync(currentImage)) {
                    fs.unlinkSync(currentImage)    
                }
    const data = await materials.destroy({ where });
    if (data)
      return res.json(
        success({
          message: "data berhasil dihapus",
          data,
        })
      );
    else throw "Data tidak ditemukan";
  } catch (error) {
    return res.json(failed({ data: error.message }));
  }
};