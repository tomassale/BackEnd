import mongoose from 'mongoose';

const carritoSchema = new mongoose.Schema({
  id: Number,
  timeStamp: { type: Date, default: Date.now },
  products: []
})

const CarritoModel = mongoose.model('Carrito', carritoSchema)
export default CarritoModel