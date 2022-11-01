import Producto from "./Productos.js";

export default class Carrito {
  constructor() {
    this.product = new Producto();
    this.carts = [];
    this.id = 1;
  }

  getByIdCart(id) {
    let prod = this.carts.find((carr) => carr.id == id);
    return prod || { error: "Carrito no encontrado" };
  }

  getAllCart() {
    return this.carts.length
      ? this.carts
      : { error: "No hay carritos cargados" };
  }

  createCart() {
    const carr = { id: this.id++, timeStamp: Date.now(), products: [] };
    this.carts.push(carr);
    return carr;
  }

  deleteProductCart(idProd, idCart) {
    const producto = this.product.getById(idProd);
    this.carts.forEach((carro) => {
      carro.id == idCart ? this.cart.splice(index, 1): null
    })
    return this.carts
  }

  postProductCart(idProd, idCart) {
    console.log(idProd);
    const producto = this.product.getById(idProd);
    this.carts.forEach((carro) => {
      carro.id == idCart ? carro.products.push(producto) : null;
    });
    return this.carts;
  }

  put(carr, id) {
    carr.id = Number(id);
    let index = this.carts.findIndex((carr) => carr.id == id);
    this.products.splice(index, 1, carr);
  }

  deleteCartById(id) {
    let index = this.carts.findIndex((carr) => carr.id == id);
    return this.carts.splice(index, 1);
  }
}