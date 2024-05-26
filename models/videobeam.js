const mongoose = require("mongoose");

const VideobeamSchema = new mongoose.Schema({
  sn: { 
    type: Number, 
    required: true,
    unique: true
  },
  status: { 
    type: Boolean, 
    required: true 
  },
});

module.exports = mongoose.model('videobeam', VideobeamSchema);
