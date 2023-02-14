const passport = require('passport');
const MyConnectionFactory = require('../DAOs/daoFactory.js');

const router = express.Router();

const connection = new MyConnectionFactory();
const form = connection.returnDbConnection();

//Routes form
router.get('/login', cors(), (req, res) => {
  res.render('login')
});

router.get('/registro', cors(), (req, res) => {
  res.render('registro')
});

router.get('/logout', cors(), (req, res, next) => {
  let { username } = req.session
  res.render('logout', { username })
  req.session.destroy((err)=>{
    if(err){
      loggerError.error('Data error')
      loggerInfo.error('Data error')
    }
  })
});

router.post('/logout', cors(), (req, res) => {
  setTimeout(()=>{
    res.render('/')
  }, 2000)
});

router.post(
  '/registro',
  passport.authenticate('register', {
    successRedirect: "/login",
    failureMessage: '/registro-error'
  })
);

router.post(
  '/login',
  passport.authenticate('login', {
    successRedirect: '/',
    failureMessage: '/login-error' 
  }
  )
);

module.exports = router