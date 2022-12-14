//Importacion de tecnologias
const express = require('express');
const session = require('express-session');
const nodemailer = require('nodemailer')
const passport = require('passport');
const bCrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const parseArgs = require("minimist");
const { Strategy } = require('passport-local');
const procesadores = require('os').cpus().length;
require('dotenv').config()
const pino = require('pino')
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

//importacion de class
const Mensajes = require('./DAOs/MensajeDaos.js');
const Productos = require('./DAOs/ProductoDaos.js');
const UsuariosSchema = require('./models/UsuarioModel.js');
const mensajes = new Mensajes();
const productos = new Productos();

//Configuracion express
const app = express();

app.use('/favicon.ico', express.static('public/images/favicon.ico'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser())
app.use(session({
	secret: process.env.MONGO_SECRET_WORD,
	cookie: {
	  httpOnly: false,
	  secure: false,
	  maxAge: 10 * 60 * 1000
	},
	rolling: true,
	resave: true,
	saveUninitialized: false
}));

//Yargs
const args = parseArgs(process.argv.slice(2), {
  alias: {p: 'PORT'},
  default: {PORT: 8080},
})
const PORT = args.PORT

//LocalStrategy
const localStrategy = Strategy

//Logger Pino
const loggerError = pino('error.log');
const loggerWarn = pino('warning.log');
const loggerInfo = pino();

loggerError.level = 'error';
loggerWarn.level = 'warn';
loggerInfo.level = 'info';

//Nodemailer
const transporter = nodemailer.createTransport({
  service: 'hotmail',
  port: 587,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD
  }
});

//Middlewares passport
app.use(passport.initialize());
app.use(passport.session());


//Functions
const createHash = (password) => {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}
const isValidPassword = (user, password) => {
  return bCrypt.compareSync(password, user.password)
}
const checkAuthentication = (req, res, next) => {
  if(req.isAuthenticated()){
      next()
  }else{
      res.redirect('/login')
  }
}

//Estrategias passport
passport.use(
  'register',
  new localStrategy(
    { 
      passReqToCallback: true,
      usernameField: 'email',
    },
    async (req, username, password, done) => {
      console.log(`Registered ${username} ${password}`);
      mongoose.connect(
        `mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PASSWORD}@cluster0.jvtto1j.mongodb.net/?retryWrites=true&w=majority`
      )
      try{
        const mailOptions= {
          from: "Server Node",
          to: `${process.env.NODEMAILER_EMAIL}`,
          subject: 'Nuevo Registro',
          html: `<h1>Nuevo Usuario</h1><br/>
                  <b>*username:</b> ${req.body.username} <br/>
                  <b>*surname:</b> ${req.body.surname} <br/>
                  <b>*age:</b> ${req.body.age} <br/>
                  <b>*phone:</b> ${req.body.phone} <br/>
                  <b>*address:</b> ${req.body.address} <br/>
                  <b>*email:</b> ${username} <br/>
                  <b>*password:</b> ${req.body.password} <br/>`
        }
        transporter.sendMail(mailOptions, function(error, info){
          if(error){
              return console.log(error);
          }
        
          console.log('Message sent: ' + info.response);
        });
        UsuariosSchema.findOne(
          {
            email: username
          },
        (err, user) => {
          if(err) {
            return done(err, null)
          }
          if(user) {
            return done(null, false)
          }
        UsuariosSchema.create(
          {
            username: req.body.username,
            surname: req.body.surname,
            age: req.body.age,
            phone: req.body.phone,
            address: req.body.address,
            email: username,
            password: createHash(password),
          },
          (err, userWithId) => {
            if(err){
              return done(err, null);
            }
            return done(null, userWithId)
          })
        })
      } catch (e) {
        return done(e, null)
      }
    }
  )
)



passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'email',
    },
    (username, password, done) => {
    console.log(`User signed ${username} ${password}`);
    mongoose.connect(
      `mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PASSWORD}@cluster0.jvtto1j.mongodb.net/?retryWrites=true&w=majority`
    )
    try {
      UsuariosSchema.findOne(
        {
          email: username,
        },
        (err, user) => {
          if(err) {
            return done(err, null)
          } 
          if(!user){
            return done(null, false)
          }
          if(!isValidPassword(user, password)) {
            return done(null, false)
          }
          return done(null, user)
        }
      )
    } catch(e) {
      return done(e, null)
    }
  })
)

//Serialize y Desearialize
passport.serializeUser((usuario, done) => {
  console.log(usuario);
  done(null, usuario._id)
})

passport.deserializeUser((id, done) => {
  UsuariosSchema.findById(id, done);
})

//Configuracion de EJS
app.set('view engine', 'ejs');

//Routes
app.get('/', checkAuthentication ,async (req, res) => {
  const username = await req.user.username
  const messages = await mensajes.getAllMessages()
  const products = await productos.getAll()
  res.render('formulario', { username, products, messages })
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/registro', (req, res) => {
  res.render('registro')
})

app.get('/api/productos-test', async (req, res) => {
  let products = []
  const messages = await mensajes.getAllMessages()
  for(let i=0; i<5; i++){
    products.push(await productos.generarProductosObj(i+1))
  }
  res.render("formulario", { products, messages });
});

app.get('/logout', (req, res, next) => {
  let { username } = req.session
  res.render('logout', { username })
  req.session.destroy((err)=>{
    if(err){
      loggerError.error('Data error')
      loggerInfo.error('Data error')
    }
  })
})

app.get('/info', (req, res) => {
  console.log()
  res.render('info', {procesadores})
})

app.get('/api/randoms', async (req, res) => {
    const random = req.query.cant||1e8
    child.send(random)
    child.on("message", (msg) =>
    {res.send(msg)})
})

app.post('/logout', (req, res) => {
  setTimeout(()=>{
    res.render('/')
  }, 2000)
})

app.post('/mensajes', async (req, res) => {
  const { nombre, apellido, email, edad, icono, mensaje } = req.body;
  await mensajes.createMessage({ author:[email, nombre, apellido, edad, icono], mensaje, timeStamp })
  res.redirect('/');
});

app.post('/productos', async (req, res) => {
  const { nombreP, precio, stock, imagen } = req.body; 
  await productos.createProduct({ nombreP, precio, stock, imagen })
  res.redirect('/')
})

app.post(
  '/registro',
  passport.authenticate('register', {
    successRedirect: "/login",
    failureMessage: '/registro-error'
  })
)

app.post(
  '/login',
  passport.authenticate('login', {
    successRedirect: '/',
    failureMessage: '/login-error' 
  }
  )
)

//Middlewares aplicacion
app.use((req, res, next) => {
  loggerInfo.info(`INCOMING REQUEST ==> Route: ${req.url}, Method: ${req.method}`)
  next()
})

app.use('*', (req, res) => {
  loggerWarn.warn('Wrong path');
  loggerInfo.warn('Wrong path');
  res.send("Ruta incorrecta");
})

//Puerto abierto
app.listen(PORT, () => {
  console.log(`Running on port ${PORT} - Pid Worker ${process.pid}`);
});