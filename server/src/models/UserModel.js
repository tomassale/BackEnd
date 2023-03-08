const { Schema, model } = require("mongoose");

const UsuariosSchema = new Schema({
  username: { type: String, required: true },
  surname: { type: String, required: true },
  age: { type: Number, required: true },
  phone: { type: Number, required: true },
  address: { type: String, required: true },
  avatar: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = model('Usuario', UsuariosSchema)