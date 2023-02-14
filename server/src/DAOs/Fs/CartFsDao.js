const Producto = require('./ProductoFsDao.js');
import fs from 'fs';

module.exports = class Carrito {
  constructor() {
    this.producto = new Producto();
    this.carritos = [];
    this.id = 1;
  }

  async crearCarrito(carr) {
    await fs.promises.writeFile('./carrito.txt', JSON.stringify(carr, null, 2), 'utf-8');
    return carr;
  }

  async getByIdCart(id) {
    try{
      const contenido = await this.getAll()
      let carrito = contenido.find((carr) => carr.id == id);
      return carrito;
    } catch (error){
      return {error: 'No existen carritos'}
    }
  }
}