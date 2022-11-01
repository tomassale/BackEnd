export default class Producto {
  static products = [];
  constructor() {
    this.id = 0;
  }

  getById(id) {
    let producto = Producto.products.find((prod) => prod.id == id);
    return producto || { error: "Producto no encontrado" };
  }

  getAll() {
    return Producto.products.length
      ? Producto.products
      : { error: "No hay productos cargados" };
  }

  save(prod) {
    prod.id = ++this.id;
    prod.timeStamp = Date.now();
    Producto.products.push(prod);
    return prod;
  }

  put(prod, id) {
    prod.id = Number(id);
    let index = Producto.products.findIndex((prod) => prod.id == id);
    Producto.products.splice(index, 1, prod);
  }

  deleteById(id) {
    let index = Producto.products.findIndex((prod) => prod.id == id);
    return Producto.products.splice(index, 1);
  }
}