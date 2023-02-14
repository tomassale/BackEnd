const {faker} = require('@faker-js/faker');
const mongoose = require('mongoose');
const { findByIdAndDelete, findByIdAndUpdate } = require('../../models/ProductoModel.js');
const ProductoModel = require('../../models/ProductoModel.js');

class ProductMongo {
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
      const newProduct = new ProductoModel({
        title: prod.title,
        price: prod.price,
        thumnail: prod.thumbnail,
        stock: prod.stock
      })
      console.log(`New product ${newProduct}`)
      return await newProduct.save()
    } catch(err){
      console.log(err)
    }
  }

  async getAll() {
    try{
      await this.mongodb(this.url);
      return await ProductoModel.find();
    } catch(error){
      return { error: 'No existen productos'}
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

  async save(prod){
    try{
      console.log('Saved on Mongo');
      await this.mongodb(this.url);
      const result = await prod.save();
      console.log(`Result ${result}`);
      return result;
    } catch(err) {
      return err;
    }
  }

  async put(id, prod) {
    try{
      await this.mongodb(this.url);
      return await findByIdAndUpdate(id, prod);
    } catch(err){
      console.log(err)
    }
  }

  async deleteById(id) {
    try{
      await this.mongodb(this.url);
      return await findByIdAndDelete(id);
    } catch(err){
      console.log(err)
    }
  }
  returnSingleton(){
    if(!this.instance){
      this.instace = new ProductMongo()
    }
    return this.instance
  }
}

module.exports = ProductMongo;