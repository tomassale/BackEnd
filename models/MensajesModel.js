const mongoose = require('mongoose');

const mensajesSchema = new mongoose.Schema({
  author: {
    nombre: String,
    apellido: String,
    edad: Number,
    alias: String,
    avatar: String,
  },
  mensaje: String,
  timeStamp: { type: Date, default: Date.now }
})

const MensajesModel = mongoose.model('Mensajes', mensajesSchema)
module.exports = MensajesModel;