const express = require("express");
const router = express.Router();
const Contenedor = require("../class/contenedor");
const contenedor = new Contenedor("productos");

router.get("/", async (req, res) => {
  const con = await contenedor.getAll();
  res.json(con);
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const cont = await contenedor.getById(id);
  cont == null ? res.json({ error: "Producto no encontrado" }) : res.json(cont);
});

router.post("/", async (req, res) => {
  const { title, price, stock } = req.body;
  const prod = await contenedor.post({ title, price, stock });
  res.send({ message: `Producto agregado ${prod}` });
});

router.put("/:id", async (req, res) => {
  const { title, price, stock } = req.body;
  const id = await contenedor.put(Number(req.params.id), {
    title,
    price,
    stock,
  });
  res.json(id);
});

router.delete("/:id", async (req, res) => {
  const borrar = await contenedor.deleteById(Number(req.params.id));
  res.json(
    borrar !== null
      ? { message: `Se elimino el producto ${borrar}` }
      : { error: "Producto no encontrado" }
  );
});

module.exports = router;