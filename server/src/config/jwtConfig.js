const jwt = require("jsonwebtoken");
require('dotenv').config();

const generateToken = (user) => {
  const token = jwt.sign({
      _id: user._id, 
      user: user.username, 
    },
    process.env.PRIVATE_KEY, 
    {
      expiresIn: 60 * 60,
    }
  );
  return token;
};

module.exports = { generateToken };