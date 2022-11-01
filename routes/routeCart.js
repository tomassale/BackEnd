import express from "express";
import Carrito from '../DAOs/CarritoDaos.js';

const router = express.Router();
const carrito = new Carrito();

//Get
router.get("/", async (req, res) => {
  const listaCarritos = await carrito.getAllCart();
  res.send(listaCarritos);
});

router.get('/:id', async (req, res) => {
  const carritoEncontrado = await carrito.getByIdCart(req.params.id);
  res.send(carritoEncontrado)
})

//Post
router.post("/", async (req, res) => {
  const carritoCreado = await carrito.createCart();
  res.send(carritoCreado);
});

router.post("/:id/productos/:idPrd", async (req, res) => {
  const respuesta = await carrito.postProductCart(
    req.params.id, 
    req.params.idPrd
    );
  res.send(respuesta);
});

//Put
router.put('/:id/productos/:idPrd', (req, res) => {
  const actualizarProductoCart = carrito.putProductCart(
    req.params.id, 
    req.params.idPrd
    )
  res.send(actualizarProductoCart)
})


//Delete
router.delete("/:id", async (req, res) => {
  const carritoBorrado = await carrito.deleteCartById(req.params.id);
  res.send(carritoBorrado);
});

router.delete("/:id/producto/:idPrd", async (req, res) => {
  const borrarProductoCart = await carrito.deleteProductCart(
    req.params.id,
    req.params.idPrd
  );
  res.send(borrarProductoCart);
});

export default router;