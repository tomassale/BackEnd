const { UserMongoDAO } = require("./UserMongoDao.js");

const userFactory = (type = "MONGO") => {
  if (type === "MONGO") {
    return UserMongoDAO.getInstance(process.env.MONGO_ATLAS);
  }
};

module.exports = userFactory;