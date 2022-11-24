import { Schema, model } from "mongoose";

const UsuariosSchema = new Schema({
  alias: { type: String, required: true },
  age: { type: Number, required: true },
  username: { type: String, required: true },
  surname: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default model('Usuario', UsuariosSchema)