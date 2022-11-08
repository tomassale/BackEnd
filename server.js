import express from 'express';
const PORT = 8080;

import Mensajes from './DAOs/MensajeDaos.js';
import Productos from './DAOs/ProductoDaos.js';
const mensajes = new Mensajes();
const productos = new Productos();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let products = []
let messages = []

//Configuracion de EJS
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  
  const messages = await mensajes.getAllMessages()
  const products = await productos.getAll()
  res.render('formulario', { products, messages })
})

app.get('/api/productos-test', async (req, res) => {
  let products = []
  for(let i=0; i<5; i++){
    products.push(await productos.generarProductosObj(i+1))
  }
  res.render("formulario", { products, messages });
});

app.post('/', async (req, res) => {
  const crearArrayMessage = await productos.createProduct()
  const { email, mensaje } = req.body;
  const { nombre, precio, stock, imagen } = req.body;

  messages.push({ email, mensaje });
  products.push({ nombre, precio, stock, imagen });
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log("Running on port " + PORT);
});