const express = require('express');
const PORT = 8080;

const Mensajes = require('./class/Mensajes');
const Productos = require('./class/Productos');
const mensajes = new Mensajes();
const productos = new Productos();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Configuracion de EJS
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const messages = mensajes.getAll();
  const products = productos.getAll()
  res.render("formulario", { products });
  res.render('formulario', { messages });
});

app.post('/productos', (req, res) => {
  const { nombre, precio, stock, imagen } = req.body;
  productos.post({ nombre, precio, stock, imagen });
  res.redirect('/');
});

app.post('/mensajes', (req, res) => {
  const { email, mensaje } = req.body;
  mensajes.post({ email, mensaje });
  res.redirect('/');
});

const crearTablas = () => {
  productos.createTable()
  mensajes.createTable();
}

crearTablas()

app.listen(PORT, () => {
  console.log('Running on port ' + PORT);
});