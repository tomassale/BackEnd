const { MongoDbContainer } = require("../../containers/mongoDbContainer");
const cartModel = require("../../models/CartModel.js");
const userFactory = require("../users/daoFactoryUser.js");
const {
  sendPurchaseMsgToAdmin,
  sendPurchaseMsgToUser,
} = require("../../lib/mailController.js");

class CartMongoDAO extends MongoDbContainer {
  constructor(url) {
    super(url, cartModel);
    this.userDao = userFactory(process.env.MONGO_ATLAS);
  }

  async getProducts(id) {
    return await super.getById(id)?.productos;
  }

  async save(userId) {
    const cart = await super.save(new cartModel({ user: userId }));
    return cart;
  }

  async saveProduct(userId, cartId, product) {
    let cart = userId
      ? await super.getDocument({ user: userId })
      : await super.getById(cartId);

    if (cart === null) {
      return null;
    }

    let existingProd = cart.productos.find((x) => x.producto == product.id);
    if (existingProd) {
      let filter = { "productos._id": existingProd._id };
      let update = {
        $set: {
          "productos.$.cantidad": existingProd.cantidad + product.cantidad,
        },
      };
      let options = { new: true };
      return await super.findOneAndUpdate(filter, update, options);
    } else {
      cart.productos.push({ producto: product.id, cantidad: product.cantidad });
      return await super.update(cart.id, cart);
    }
  }

  async deleteProduct(cartId, productId) {
    let cart = await super.getById(cartId);
    if (cart === null) {
      return null;
    }
    let existingProd = cart.productos.find((x) => x.producto == productId);
    if (existingProd === null) {
      return null;
    }
    return await super.update(cartId, {
      $pull: {
        productos: { _id: existingProd._id },
      },
    });
  }

  async buyCart(userId) {
    let user = await this.userDao.getById(userId);
    let cart = await super.getDocument({ user: userId });
    if (cart === null) {
      return null;
    }
    if (cart.productos.length == 0) {
      return "no hay productos en el carrito";
    }
    if ((await this.deleteById(cart.id)) == null) {
      return null;
    }
    sendPurchaseMsgToAdmin(user);
    sendPurchaseMsgToUser(user);
    return cart;
  }

  static getInstance(url) {
    if (!this.instance) {
      this.instance = new CartMongoDAO(url);
    }
    return this.instance;
  }
}

module.exports = { CartMongoDAO };