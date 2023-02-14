const { Router } = require('express');
const procesadores = require('os').cpus().length;

const router = Router();

const Mensajes = require('../DAOs/MensajeDaos.js');
const Productos = require('../DAOs/ProductoDaos.js');
const mensajes = new Mensajes();
const productos = new Productos();

router.get('/info', cors(), (req, res) => {
  res.render('info', {procesadores})
});

router.get('/api/randoms', cors(), async (req, res) => {
  const random = req.query.cant||1e8
  child.send(random)
  child.on('message',  (msg) =>
  {res.send(msg)})
});

router.get('/api/productos-test', cors(), async (req, res) => {
  let products = []
  const messages = await mensajes.getAllMessages()
  for(let i=0; i<5; i++){
    products.push(await productos.generarProductosObj(i+1))
  }
  res.render('formulario', { products, messages });
});

module.exports = router