const mongoose = require("mongoose");

const FacturaprestamoSchema = new mongoose.Schema({
  id_room: { 
    type: String, 
    required: true
  },
  id_videobeam: { 
    type: String, 
    required: true 
  },
  date_request: { 
    type: Date, // PASAR A DATE
    required: true
  },
  date_prestamo: { 
    type: Date, // PASAR A DATE
    required: true
  },
});

module.exports = mongoose.model('Facturaprestamo', FacturaprestamoSchema);
