const hbs = require("express-handlebars");
const express = require("express");
const Productos = require("./api/productos.js");

let productos = new Productos();
const PORT = 8080;


const app = express();

//Configuración de handlebars
app.engine(
  "hbs",
  hbs.engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.static("public"));

const router = express.Router();
app.use("/api", router);

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/productos/listar", (req, res) => {
  res.json(productos.listarAll());
});

router.get("/productos/listar/:id", (req, res) => {
  let { id } = req.params;
  res.json(productos.listar(id));
});

router.post("/productos/guardar", (req, res) => {
  let producto = req.body;
  productos.guardar(producto);
  res.redirect("/");
});

router.put("/productos/actualizar/:id", (req, res) => {
  let { id } = req.params;
  let producto = req.body;
  productos.actualizar(producto, id);
  res.json(producto);
});

router.delete("/productos/borrar/:id", (req, res) => {
  let { id } = req.params;
  let producto = productos.borrar(id);
  res.json(producto);
});

router.get("/productos/vista", (req, res) => {
  let prods = productos.listarAll();

  res.render("vista", {
    productos: prods,
    productosEncontrados: prods.length,
  });
});


const server = app.listen(PORT, () => {
  console.log("Running on port " + PORT);
});
server.on("error", (error) => console.log(`Error: ${error}`));
