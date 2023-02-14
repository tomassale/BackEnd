const fs = require('fs');

//Definir los productos
module.exports = class ProductoFs {
  instance
  constructor() {
    this.id = 0;
  }

  //Crear Archivo con el producto
  async createProduct(prod) {
    try {
      console.log('Guardando en fs')
      const productos = await this.getAll()
      productos.data.push(prod)
      await fs.promises.writeFile('./Productos.json', JSON.stringify(productos, null, 2), 'utf-8');
      return prod;
    } catch (err) {
      console.log(err);
      console.log('No se pudo agregar el archivo');
    }
  }
  async getAll(){
    try{
      console.log('Leyendo en fs');
      const contenido = await fs.promises.readFile('./productos.json', 'utf-8');

      return JSON.parse(contenido);
    } catch (err) {
      return { error: 'No existen productos' }
    }
  }
  async getById(id) {
    try {
      console.log('Reading fs');
      const contenido = await this.getAll();
      let producto = contenido.find((prod) => prod.id == id);
      return producto || { error: 'Producto no encontrado' };
    } catch(error){
      return { error: 'Producto no existe' }
    }
  }
  //Obtener todos los productos
  async save(prod) {
    try {
      const contenido = await this.getAll();
      const indice = contenido.sort((a, b) => b.id - a.id)[0].id;
      prod.id = indice + 1;
      prod.timeStamp = Date.now();
      contenido.push(prod);
      this.createProduct(contenido);
      console.log('---Nuevo producto ingresado---')
      return prod;
    } catch(err) {
      await this.createProduct([]);
      const contenido = await this.getAll();
      prod.id = 1;
      prod.timeStamp = Date.now();
      contenido.push(prod);
      this.createProduct(contenido);
      console.log('---Nuevo producto ingresado---');
      return prod;
    }
  }

  async put(id, prod) {
    try {
      const contenido = await this.getAll();
      let index = contenido.findIndex((p) => p.id === id);
      prod.timeStamp = Date.now();
      if (index >= 0) {
        contenido.splice(index, 1, { ...prod, id });
        this.createProduct(contenido);
        return prod;
      } else {
        return {msj: `Producto con id: ${prod.id} no existe`};
      }
    } catch (err) {
      console.log(err)
    }
  }

  async deleteById(id) {
    const contenido = await this.getAll();
    let index = contenido.findIndex((prod) => prod.id == id);
    console.log(index);
    if(index > 0) {
      contenido.splice(index, 1);
      this.createProduct(contenido);
      return {msj: `Producto con id: ${id} eliminado`};
    } else {
      return {msg: `Producto con id: ${id} no encontrado`};
    }
  }
  static returnSingleton(){
    if(!this.instance){
      this.instance = new ProductoFs()
    }
    return this.instance
  }
}
