const { ObjectId } = require("mongodb");
const Videobeam = require('../models/videobeam');

async function getVideobeam(req, res) {
  try {
    const {sn, status} = req.query;
    const result = [];
    
    const filter = {};

    if (sn) filter.sn = sn
    if (status) filter.status = status

    const response = await Videobeam.find(filter);

    if (!response[0]) return res.status(400).send({msg: "NO SE ENCONTRARON VIDEOBEAMS", status: false});

    response.map((data, index) => {
      data = data.toObject();
      delete data.__v;
      result.push(data);
    });

    return res.status(200).send({msg: result, status: true});
    
  } catch (error) {
    console.error({msg: `ERROR AL HACER PETICION getVideobeam:  ${error}`, status: false});
    return res.status(500).send({msg: `ERROR AL OBTENER LOS DATOS: ${error}`, status: false});
  }
}

async function postVideobeam(req, res) {
  try {
    const {sn} = req.body;

    const videobeam = new Videobeam({
      sn,
      status: true,
    });

    const videobeamStorage = await videobeam.save();
    if (!videobeamStorage) return res.status(400).send({msg: "ERROR AL GUARDAR LOS DATOS", status: true});
    
    return res.status(200).send({msg: videobeamStorage, status: true});

  } catch (error) {
    console.error({msg: `ERROR AL HACER PETICION postVideobeam:  ${error}`, errorCode: error.code, status: false});
    return res.status(500).send({msg: `ERROR AL GUARDAR LOS DATOS: ${error}`, errorCode: error.code, status: false});
  }  
}

async function updateVideobeam(req, res) {
  try {
    const {_id, sn, newsn, status} = req.query;
    
    const filter = {}
    const update = {};
    
    if (newsn) update.sn = parseInt(newsn);
    if (status) {
      update.status = Boolean(status);
    } else {
      update.status = true;
    }
    
    if (sn) filter.sn = parseInt(sn);
    if (_id) filter._id = new ObjectId(_id);
    console.log(filter);

    const success = await Videobeam.updateOne(filter, update);

    if (!success.modifiedCount) return res.status(400).send({msg: "ERROR AL ACTUALIZAR LOS DATOS", status: false});

    return res.status(200).send({msg: "VIDEOBEAM ACTUALIZADO", status: true});

  } catch (error) {
    console.error({msg: `ERROR AL HACER PETICION updatetVideobeam:  ${error}`, status: false});
    return res.status(500).send({msg: `ERROR AL ACTUALIZAR LOS DATOS: ${error}`, status: false});
  }
}

module.exports = {
  getVideobeam,
  postVideobeam,
  updateVideobeam,
}
