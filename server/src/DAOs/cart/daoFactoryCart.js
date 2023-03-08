const { CartFileSystemDAO } = require("./CartFsDao.js");
const { CartMongoDAO } = require("./CartMongoDao.js");

const cartFactory = (type = "FS") => {
  if (type === "FS") {
    return new CartFileSystemDAO("carrito");
  }
  if (type === "MONGO") {
    return new CartMongoDAO.getInstance(process.env.MONGO_ATLAS);
  }
};

module.exports = cartFactory;