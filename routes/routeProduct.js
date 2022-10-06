import express from "express";
import Producto from "../class/Producto.js";

const router = express.Router();

const producto = new Producto();

function admin(req, res, next) {
  if (req.query.admin) {
    next();
  } else {
    res.send("No tiene permiso de administrador");
  }
}

router.get('/', (req, res) => {
  const lista = producto.getAll();
  res.send(lista)
})

router.post("/", (req, res) => {
  console.log(req.body);
  const productoCreado = producto.save(req.body);
  res.send(productoCreado);
});

router.delete("/:id", (req, res) => {
  const productoBorrado = producto.deleteById(req.params.id);
  res.send(productoBorrado);
});

router.put("/:prod/:id", (req, res) => {
  const actualizar = producto.put(
    req.params.prod,
    req.params.id
  );
  res.send(actualizar);
});

router.get("/:id", (req, res) => {
  const productoBuscado = producto.getById(req.params.id);
  res.send(productoBuscado);
});

export default router;