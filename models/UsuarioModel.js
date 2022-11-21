import mongoose from "mongoose";

const usuariosSchema = new mongoose.Schema({
  usuario: String, 
});

export default model('Usuario', usuariosSchema)