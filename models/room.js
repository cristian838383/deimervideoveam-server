const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  numberroom: { 
    type: Number, 
    required: true,
    unique: true
  },
});

module.exports = mongoose.model('Room', RoomSchema);
