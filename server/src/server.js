//Importacion de tecnologias
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const nodemailer = require('nodemailer');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const parseArgs = require("minimist");
const { Strategy } = require('passport-local');
const { ProductoSchema } = require('./GraphQL/Schema/Productos.schema')
require('dotenv').config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

//Importacion routes
const routeForm = require('./routes/routeForm');
const routeMain = require('./routes/routeMain');
const routeTest = require('./routes/routeTest');
const { createHash, isValidPassword } = require('./controller/operaciones');

//Importacion de class
const UsuariosSchema = require('./models/UsuarioModel');

//Configuracion express
const app = express();

app.use('/favicon.ico', express.static('public/images/favicon.ico'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

app.use(cookieParser());
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
});

const PORT = args.PORT;

//LocalStrategy
const localStrategy = Strategy;

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

app.use('/form', routeForm);
app.use('/test', routeTest);
app.use('/api', routeMain);

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
                  <b>*picture:</b> ${req.body.picture} <br/>
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
);

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
);

//Serialize y Desearialize
passport.serializeUser((usuario, done) => {
  console.log(usuario);
  done(null, usuario._id)
});

passport.deserializeUser((id, done) => {
  UsuariosSchema.findById(id, done);
});

//Configuracion de EJS
app.set('view engine', 'ejs');

app.use('/graphql', graphqlHTTP({
  schema: ProductoSchema,
  rootValue: {
    getProductos: getProductos,
    createProducto: createProducto,
    deleteProducto: deleteProducto,
    updateProducto: updateProducto
  },
  graphiql: true,
}))

//Puerto abierto
app.listen(PORT, () => {
  console.log(`Running on port ${PORT} - Pid Worker ${process.pid}`);
});