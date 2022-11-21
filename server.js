import express from 'express';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import session from 'express-session';

const PORT = 8080;

import Mensajes from './DAOs/MensajeDaos.js';
import Productos from './DAOs/ProductoDaos.js';
const mensajes = new Mensajes();
const productos = new Productos();

const app = express();

const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}

app.use(session({
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://tomas:zeuscoco00@cluster0.jvtto1j.mongodb.net/?retryWrites=true&w=majority',
    mongoOptions: advancedOptions,
    ttl: 1 * 60
  }),
  secret:'secretWord',
  resave: false,
  saveUninitialized: false
}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Configuracion de EJS
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  const messages = await mensajes.getAllMessages()
  const products = await productos.getAll()
  res.render('formulario', { products, messages })
})

app.get('/api/productos-test', async (req, res) => {
  let products = []
  let usuario = req.session.usuario
  const messages = await mensajes.getAllMessages()
  for(let i=0; i<5; i++){
    products.push(await productos.generarProductosObj(i+1))
  }
  res.render("formulario", { products, messages, usuario });
});

app.get('/login', async (req, res) => {
  res.render('login')
})

app.get('/logout', (req, res) => {
  res.render('logout')
  req.session.destroy(err=>{
    if(!err){
      setTimeout(()=>{
        res.redirect('/')
      }, 2000)
    }else{
      res.json(err)
    }
  })  
});

app.post('/mensajes', async (req, res) => {
  const { alias, nombre, apellido, email, edad, icono, mensaje } = req.body;
  await mensajes.createMessage({ author:[email, nombre, apellido, edad, alias, icono], mensaje })
  res.redirect('/');
});

app.post('/productos', async (req, res) => {
  const { nombreP, precio, stock, imagen } = req.body; 
  await productos.createProduct({ nombreP, precio, stock, imagen })
  res.redirect('/')
})

app.post('/nombre', async (req, res) => {
  req.session.usuario = req.body.usuario
})

app.listen(PORT, () => {
  console.log("Running on port " + PORT);
});