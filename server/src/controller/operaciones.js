const bCrypt = require('bcrypt');

const createHash = (password) => {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

const isValidPassword = (user, password) => {
  return bCrypt.compareSync(password, user.password)
};

const checkAuthentication = (req, res, next) => {
  if(req.isAuthenticated()){
      next()
  }else{
      res.redirect('/login')
  }
};

module.exports = { createHash, isValidPassword, checkAuthentication }