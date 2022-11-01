import mongoose from "mongoose";
import CarritoModel from "../models/CarritoModel.js";
import Producto from "./ProductoDaos.js";
import ProductoModel from "../models/ProductoModel.js";

export default class Carrito {
  static carts = [];
  constructor() {
    this.url = 'mongodb+srv://tomas:zeuscoco00@cluster0.jvtto1j.mongodb.net/?retryWrites=true&w=majority'
    this.mongodb = mongoose.connect
    this.product = new Producto();
  }

  async createCart(prod) {
    try{
      await this.mongodb(this.url)
      const newCart = await new CarritoModel(prod).save()
      return {newCart}
    } catch(err){
      console.log(err)
    }
  }

  async getByIdCart(id) {
    try{
      await this.mongodb(this.url)
      return await CarritoModel.findById(id)
    } catch(err){
      return {error: 'Carrito no encontrado'}
    }
  }

  async getAllCart() {
    try{
      await this.mongodb(this.url)
      return await CarritoModel.find()
    } catch(err) {
      return {error: "No hay carritos cargados"}
    };
  }

  async postProductCart(idCart, idProd) {
    try{
      const producto = await ProductoModel.findById(idProd)
      await CarritoModel.updateOne(
        { _id: idCart },
        { $push: { products: producto}}
      )
      return await CarritoModel.findById(idCart)
    } catch(err){
      return {error: 'Producto para carrito no encontrado'}
    }
  }

  async putProductCart(carr, id) {
    try{
      await this.mongodb(this.url)
      await CarritoModel.findByIdAndUpdate(carr, id)
      return Producto.getById(id)
    } catch(err){
      return {error: 'Producto en carrito no encontrado'}
    }
  }

  async deleteCartById(id) {
    try{
      await this.mongodb(this.url)
      return await CarritoModel.findByIdAndDelete(id)
    } catch(err){
      return {error: 'Producto en carrito no encontrado'}
    }
  }

  async deleteProductCart(idCart, idProd) {
    try{
      await this.mongodb(this.url)
      return await CarritoModel.findByIdAndDelete(idCart, idProd)
      } catch(err){
      return {error: 'Producto en carrito no encontrado'}
    }
  }
}