import {faker} from '@faker-js/faker'
import mongoose from 'mongoose';
import ProductoModel from '../models/ProductoModel.js';

export default class Producto {
    static products = [];
    constructor() {
      this.url = 'mongodb+srv://tomas:zeuscoco00@cluster0.jvtto1j.mongodb.net/?retryWrites=true&w=majority'
      this.mongodb = mongoose.connect
    }

    async generarProductosObj(id){
      return {
        id: id,
        nombre: faker.commerce.product(),
        precio: faker.commerce.price(500, 10000, 0, '$'),
        stock: faker.random.numeric(2),
        imagen: faker.image.food(),
      }
    }

    async createProduct(prod) {
        try{
          await this.mongodb(this.url)
          const newProduct = await new ProductoModel(prod).save()
          return {newProduct}
        } catch(err){
            console.log(err)
        }
    }

    async getById(id) {
      try{
        await this.mongodb(this.url)
        return await ProductoModel.findById(id)
      } catch(err){
        return {error: 'Producto no existe'}
      }
    }

    async getAll() {
      try{
        await this.mongodb(this.url)
        return await ProductoModel.find()
      } catch(error){
        return { error: 'No existen productos'}
      }
    }

    async put(id, prod) {
      try{
        await this.mongodb(this.url)
        await ProductoModel.findByIdAndUpdate(id, prod)
        return this.getById(id)
      } catch(err){
        console.log(err)
      }
    }

    async deleteById(id) {
      try{
        await this.mongodb(this.url)
        return await ProductoModel.findByIdAndDelete(id)
      } catch(err){
        console.log(err)
      }
    }
  }