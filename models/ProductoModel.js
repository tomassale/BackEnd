const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: String,
  precio: String,
  stock: Number,
  imagen: String
})

const ProductoModel = mongoose.model('Producto', productoSchema)
module.exports = ProductoModel