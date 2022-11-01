import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
  nombre: String,
  precio: String,
  stock: Number
})

const ProductoModel = mongoose.model('Producto', productoSchema)
export default ProductoModel