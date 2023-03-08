const { ProductFileSystemDAO } = require("./productFsDao.js");
const { ProductMongoDAO } = require("./ProductMongoDao.js");

const productFactory = (type = "FS") => {
  if (type === "FS") {
    return new ProductFileSystemDAO("productos");
  }
  if (type === "MONGO") {
    return ProductMongoDAO.getInstance(process.env.MONGO_ATLAS);
  }
};

module.exports = productFactory;