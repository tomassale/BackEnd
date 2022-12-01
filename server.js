//Importacion de tecnologias
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import bCrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import parseArgs from "minimist";
import { Strategy } from 'passport-local';
import {fork}  from 'child_process';
const child = fork('./fork/child.js');

//Importacion de class
import Mensajes from './DAOs/MensajeDaos.js';
import Productos from './DAOs/ProductoDaos.js';
import UsuariosSchema from './models/UsuarioModel.js'
const mensajes = new Mensajes();
const productos = new Productos();

//Configuracion express
const app = express();

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

//Middlewares passport
app.use(passport.initialize());
app.use(passport.session());

//LocalStrategy
const localStrategy = Strategy

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
    { passReqToCallback: true },
    async (req, username, password, done) => {
      console.log(`Registered ${username} ${password}`);
      mongoose.connect(
        `mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PASSWORD}@cluster0.jvtto1j.mongodb.net/?retryWrites=true&w=majority`
      )
      try{
        UsuariosSchema.findOne(
          {
            email: req.body.email
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
            alias: req.body.alias,
            age: req.body.age,
            username,
            surname: req.body.surname,
            address: req.body.address,
            email: req.body.email,
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
  new localStrategy((username, password, done) => {
    mongoose.connect(
      `mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PASSWORD}@cluster0.jvtto1j.mongodb.net/?retryWrites=true&w=majority`
    )
    try {
      UsuariosSchema.findOne(
        {
          username,
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
      res.json(err)
    }
  })
})

app.get('/info', (req, res) => {
  res.render('info')
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
  const { alias, nombre, apellido, email, edad, icono, mensaje } = req.body;
  await mensajes.createMessage({ author:[email, nombre, apellido, edad, alias, icono], mensaje, timeStamp })
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

//Puerto abierto
app.listen(PORT, () => {
  console.log("Running on port " + PORT);
});