import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
  id: Number,
  nombre: String,
  precio: String,
  stock: Number,
  imagen: String
})

const ProductoModel = mongoose.model('Producto', productoSchema)
export default ProductoModel