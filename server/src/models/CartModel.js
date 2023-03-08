const { Schema, model } = require('mongoose');

const carritoSchema = new Schema({
  productos: [
    {
      producto: { type: Schema.Types.ObjectId, ref: 'producto'},
      cantidad: Number,
    }
  ],
  author: { type: Schema.Types.ObjectId, ref: "usuarios"},
  timeStamp: { type: Date, default: Date.now },
})

module.exports = model('Carrito', carritoSchema)