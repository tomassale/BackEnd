const express = require("express");
const fs = require("fs");
const app = express();

class Contenedor {
  async getAll() {
    try {
      const contenido = await fs.promises.readFile("./productos.txt", "utf-8");
      return JSON.parse(contenido);
    } catch (error) {
      console.log(error);
    }
  }
  async save(productos) {
    try {
      await fs.promises.writeFile(
        "./productos.txt",
        JSON.stringify(productos, null, 2),
        "utf-8"
      );
    } catch (e) {
      console.log(e);
    }
  }
  async saveNew(productoNuevo) {
    const contenido = await this.getAll();
    const indice = contenido.sort((a, b) => b.id - a.id)[0].id;
    productoNuevo.id = indice + 1;
    contenido.push(productoNuevo);
    this.save(contenido);
  }
  async getById(id) {
    const contenido = await this.getAll();
    const productoBuscado = contenido.find((map) => map.id == id);
    return console.log(productoBuscado);
  }
  async deleteById(id) {
    const contenido = await this.getAll();
    const productoEliminado = contenido.filter((map) => map.id !== id);
    console.log(productoEliminado);
    this.save(productoEliminado);
  }
  async deleteAll() {
    await fs.promises.writeFile("./productos.txt", "[]", "utf-8");
  }
}

const contenedor = new Contenedor();

const puerto = app.listen(8080, () => {
  console.log("Running on port " + puerto.address().port);
});
