const express = require("express"),
  app = express(),
  PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const server = app.listen(PORT, () => {
  console.log("Running on port " + PORT);
});
server.on("error", (error) => console.log(`hubo un error ${error}`));
const productos = [];
//Configuracion de EJS
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("formulario", { productos });
});

app.post("/productos", (req, res) => {
  console.log(req.body);
  productos.push(req.body);
  res.render("formulario", { productos });
});
