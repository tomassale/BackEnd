const mongoose = require("mongoose");
const CartModel = require("../models/MensajesModel.js");

class Carrito {
  static message = [];
  constructor() {
    this.url = 'mongodb+srv://tomas:zeuscoco00@cluster0.jvtto1j.mongodb.net/?retryWrites=true&w=majority'
    this.mongodb = mongoose.connect
  }
  
  
}

module.exports = Carrito;