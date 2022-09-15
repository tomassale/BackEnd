const fs = require("fs");

let listaProductos = [
  {
    title: "Vino Blanco",
    price: 123.45,
    stock: 15,
    id: 1,
  },
  {
    title: "Vino espumoso",
    price: 234.56,
    stock: 40,
    id: 2,
  },
  {
    title: "Vino Tinto",
    price: 345.67,
    stock: 50,
    id: 3,
  },
];

class Contenedor {
  constructor(desafio) {
    this.desafio = desafio;
    this.itemList = listaProductos;
  }

  // Métodos
  async post(producto) {
    const contenido = await this.getAll();
    const indice = contenido.sort((a, b) => b.id - a.id)[0].id;
    producto.id = indice + 1;
    contenido.push(producto);
    this.itemList = contenido;
    console.log("Producto agregado");
    return producto.id;
  }

  // Reemplaza un producto en base a su id
  async put(id, producto) {
    try {
      const contenido = await this.getAll();
      const index = contenido.findIndex((p) => p.id === id);
      if (index >= 0) {
        contenido.splice(index, 1, { ...producto, id });
        this.itemList = contenido;
        return producto;
      } else {
        console.log(`${producto.id} no existe`);
      }
    } catch (err) {
      console.log("No se encontro el producto");
      return err;
    }
  }

  // Recibe un id y devuelve el objeto con ese id, o null si no está.
  async getById(id) {
    try {
      const contenido = await this.getAll();
      const productoBuscado = contenido.filter((producto) => producto.id == id);
      if (productoBuscado != 0) {
        return productoBuscado;
      } else {
        console.log("Producto no encontrado");
        return null;
      }
    } catch (err) {
      console.log("Producto no encontrado", err);
      return err;
    }
  }

  // Devuelve un array con los objetos presentes en el archivo.
  async getAll() {
    try {
      const contenido = this.itemList;
      return contenido;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteById(id) {
    try {
      const contenido = await this.getAll();
      const idBuscado = contenido.filter((producto) => producto.id != id);
      this.itemList = idBuscado;
      console.log("Producto eliminado");
      return id;
    } catch (err) {
      console.log(err);
    }
  }
}
module.exports = Contenedor;
