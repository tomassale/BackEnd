import express from "express";
import Producto from "../DAOs/ProductoDaos.js";

const router = express.Router();

const producto = new Producto();

//Funcion admisora
function admin(req, res, next) {
  if (req.query.admin) {
    next();
  } else {
    res.send("No tiene permiso de administrador");
  }
}

//Get
router.get('/', async (req, res) => {
  const response = await producto.getAll()
  res.send(response)
})

router.get("/:id", async (req, res) => {
  const cont = await producto.getById(req.params.id);
  res.send(cont);
});

//Post
router.post("/", admin, async (req, res) => {
  console.log(req.body);
  const response = await producto.createData(req.body)
  res.send(response)
});

//Put
router.put("/:id", admin, async (req, res) => {
  const productoActualizado = await producto.put(
    req.params.id, 
    req.body
    );
  res.send(productoActualizado);
});

//Delete
router.delete("/:id", admin, async (req, res) => {
  const productoBorrado = await producto.deleteById(req.params.id);
  res.send(productoBorrado);
});

export default router;