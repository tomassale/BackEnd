const mongoose = require('mongoose');

const carritoSchema = new mongoose.Schema({
  author: {
    nombre: String,
    cantidad: Number,
    valor: Number,
  },
  timeStamp: { type: Date, default: Date.now }
})

const CarritoModel = mongoose.model('Carrito', carritoSchema)
module.exports = CarritoModel;