const { Schema, model } = require('mongoose');

const productoSchema = new Schema({
  nombre: { type: String, require: true},
  descripcion: { type: String, require: true },
  precio: { type: Number, require: true},
  stock: { type: Number, require:true },
  imagen: { type: String, require: true},
  categoria: { type: String, require: true },
  timeStamp: { type: Date, default: Date.now },
})

const ProductoModel = model('Producto', productoSchema)
module.exports = ProductoModel