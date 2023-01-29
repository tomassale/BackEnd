const { Router } = require('express');
const { checkAuthentication } = require('../controller/operaciones.js');

const router = Router();

//Importacion de class
const Mensajes = require('../DAOs/MensajeDaos.js');
const Productos = require('../DAOs/ProductoDaos.js');
const mensajes = new Mensajes();
const productos = new Productos();

router.get('/', checkAuthentication ,async (req, res) => {
  const username = await req.user.username
  const messages = await mensajes.getAllMessages()
  const products = await productos.getAll()
  res.render('formulario', { username, products, messages })
});

router.post('/mensajes', async (req, res) => {
  const { nombre, apellido, email, edad, icono, mensaje } = req.body;
  await mensajes.createMessage({ author:[email, nombre, apellido, edad, icono], mensaje, timeStamp })
  res.redirect('/');
});

router.post('/productos', async (req, res) => {
  const { nombreP, precio, stock, imagen } = req.body;
  await productos.createProduct({ nombreP, precio, stock, imagen })
  res.redirect('/')
});

module.exports = router