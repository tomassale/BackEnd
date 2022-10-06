import express from "express";
import Carrito from "../class/Carrito.js";

const router = express.Router();
const carrito = new Carrito();

router.post("/", (req, res) => {
  const carritoCreado = carrito.createCart();
  res.send(carritoCreado);
});

router.delete("/:id", (req, res) => {
  const carritoBorrado = carrito.deleteCartById(req.params.id);
  res.send(carritoBorrado);
});

router.get("/", (req, res) => {
  const listaCarritos = carrito.getAllCart();
  res.send(listaCarritos);
});

router.post("/:id/productos/:idPrd", (req, res) => {
  const respuesta = carrito.postProductCart(req.params.idPrd, req.params.id);
  res.send(respuesta);
});

router.delete("/:id/producto/:idPrd", (req, res) => {
  const borrarProductoCart = carrito.deleteProductCart(
    req.params.idPrd,
    req.params.id
  );
  res.send(borrarProductoCart);
});

export default router;