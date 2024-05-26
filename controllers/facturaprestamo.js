const Facturaprestamo = require('../models/facturaprestamo');
const Videobeam = require('../models/videobeam');


async function getFacturaprestamo(req, res) {
  try {
    const {id_room, id_videobeam, date_request, date_prestamo} = req.query;
    
    const filter = {};

    if (id_room) filter.id_room = id_room
    if (id_videobeam) filter.id_videobeam = id_videobeam
    if (date_request) filter.date_request = date_request
    if (date_prestamo) filter.date_prestamo = date_prestamo
    
    const response = await Facturaprestamo.find(filter);

    if (!response[0]) return res.status(400).send({msg: "NO SE ENCONTRARON FACTURASPRESTAMO", status: false});

    return res.status(200).send({msg: response, status: true});
    
  } catch (error) {
    console.error({msg: `ERROR AL HACER PETICION getFacturaprestamo:  ${error}`, status: false});
    return res.status(500).send({msg: `ERROR AL OBTENER LOS DATOS: ${error}`, status: false});
  }
}

async function postFacturaprestamo(req, res) {
  try {
    const {id_room, id_videobeam, date_prestamo, sn} = req.body;

    function esSabado(date_prestamo) {
      // Crear un objeto Date con la fecha proporcionada
      let fechaObj = new Date(date_prestamo);
      // Obtener el día de la semana (0 es domingo, 6 es sábado)
      let diaSemana = fechaObj.getDay();
      // Verificar si el día de la semana es 6 (sábado)
      return diaSemana === 6;
    }

    const isSabado = esSabado(date_prestamo);

    if (!isSabado) return res.status(400).send({msg: "Solo está permitido reservar los sabados", status: false});

    // Verificar si el videobeam está disponible
    const videobeam = await Videobeam.find({sn: sn, status: true });

    if (!videobeam[0]) return res.status(400).send({ msg: "No hay videobeam disponible", status: false });
    
    const facturaprestamo = new Facturaprestamo({
      id_room,
      id_videobeam,
      date_request: new Date().toISOString(),
      date_prestamo
    });

    const success = await Videobeam.updateOne({sn: id_videobeam}, { status: false });
    if (!success.modifiedCount) return res.status(400).send({msg: "ERROR AL ACTUALIZAR LOS DATOS", status: false});

    const facturaprestamoStorage = await facturaprestamo.save();
    if (!facturaprestamoStorage) return res.status(400).send({msg: "ERROR AL GUARDAR LOS DATOS", status: false});
    
    return res.status(200).send({msg: facturaprestamoStorage, status: true});

  } catch (error) {
    console.error({msg: `ERROR AL HACER PETICION postFacturaprestamo:  ${error}`, status: false});
    return res.status(500).send({msg: `ERROR AL GUARDAR LOS DATOS: ${error}`, status: false});
  }
}

module.exports = {
  getFacturaprestamo,
  postFacturaprestamo,
}
