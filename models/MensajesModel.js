import mongoose from 'mongoose';

const mensajesSchema = new mongoose.Schema({
  author: {
    nombre: String,
    apellido: String,
    edad: Number,
    alias: String,
    avatar: String,
  },
  mensaje: String,
})

const MensajesModel = mongoose.model('Mensajes', mensajesSchema)
export default MensajesModel