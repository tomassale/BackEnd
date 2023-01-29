const { Router } = require('express');
const passport = require('passport');

const router = Router();

//Routes form
router.get('/login', (req, res) => {
  res.render('login')
});

router.get('/registro', (req, res) => {
  res.render('registro')
});

router.get('/logout', (req, res, next) => {
  let { username } = req.session
  res.render('logout', { username })
  req.session.destroy((err)=>{
    if(err){
      loggerError.error('Data error')
      loggerInfo.error('Data error')
    }
  })
});

router.post('/logout', (req, res) => {
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