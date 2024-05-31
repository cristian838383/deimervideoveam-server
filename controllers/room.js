const Room = require('../models/room');

async function getRoom(req, res) {
  try {
    const {numberroom} = req.query;
    
    const filter = {};

    if (numberroom) filter.numberroom = numberroom
    
    const response = await Room.find(filter);

    if (!response[0]) return res.status(400).send({msg: "NO SE ENCONTRARON ROOMS", status: false});

    return res.status(200).send({msg: response, status: true});
    
  } catch (error) {
    console.error({msg: `ERROR AL HACER PETICION getRoom:  ${error}`, status: false});
    return res.status(500).send({msg: `ERROR AL OBTENER LOS DATOS: ${error}`, status: false});
  }
}


async function postRoom(req, res) {
  try {
    const {numberroom} = req.body;

    const room = new Room({
      numberroom
    });

    const roomStorage = await room.save();
    console.log("🚀 ~ postRoom ~ roomStorage:", roomStorage)
    if (!roomStorage) res.status(400).send({msg: "ERROR AL GUARDAR LOS DATOS", status: false});

    return res.status(200).send({msg: roomStorage, status: true});

  } catch (error) {
    console.error({msg: `ERROR AL HACER PETICION postRoom:  ${error}`, errorCode: error.code, status: false});
    return res.status(500).send({msg: `ERROR AL GUARDAR LOS DATOS: ${error}`, errorCode: error.code, status: false});
  }
}

module.exports = {
  getRoom,
  postRoom,
}
