const cors = require('cors');
const express = require('express')
const { checkAuthentication } = require('../controller/operaciones.js');
const MyConnectionFactory = require('../DAOs/daoFactory.js')

const router = express.Router();
const app = express();
const connection = new MyConnectionFactory();
const product = connection.returnDbConnection();
app.use(cors())

//Importacion de class
const Productos = require('../DAOs/ProductoDaos.js');
const productos = new Productos();

router.get('/', checkAuthentication ,async (req, res) => {
  const username = await req.user.username
  const products = await productos.getAll()
  res.render('formulario', { username, products })
});

router.post('/', checkAuthentication, async (req, res) => {
  console.log(req.body);
  const response = await productos.createProduct(req.body);
  res.send(response)
})

router.delete('/:id', checkAuthentication, async (req, res) => {
  const productoBorrado = await productos.borrar(req.params.id);
  res.send(productoBorrado);
})

router.get('/', async (req, res) => {
  const { nombreP, precio, stock, imagen } = req.body;
  await productos.createProduct({ nombreP, precio, stock, imagen })
  res.redirect('/')
});

module.exports = router