const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const PORT = 8080;

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const messages = [
  {
    email: 'tomassale@hotmail.com',
    datetime: new Date().toLocaleString(),
    mensaje: 'Hola!!!'
  },
];

const products = [
  {
    nombre: "Vino Tinto",
    precio: 1500,
    stock: 15,
    imagen:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSSU4-TKpzBx2g0s5FFb5iwfleK78B3amosiQ3tqASLFDa8GQptnNUxYsYwWFuXPHPHUcwF35TMgQE&usqp=CAc",
  },
];
//Configuracion de EJS
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("formulario", { products });
  res.render("formulario", { messages });
});

app.post("/", (req, res) => {
  console.log(req.body);
  products.push({ nombre: req.body.nombre, precio: req.body.precio, stock: req.body.stock, imagen: req.body.imagen });
  res.render("formulario", { products });
});

app.post("/", (req, res) => {
  console.log(req.body);
  messages.push(req.body.email, null ,req.body.mensaje);
  res.render("formulario", { messages });
});

io.on("connection", (socket) => {
  console.log("New user connected");
  console.log(messages);
  socket.emit("messages", messages);

  socket.on("new-message", (data) => {
    messages.push(data);
    io.sockets.emit("messages", messages);
  });
});

httpServer.listen(PORT, () => {console.log("Running on port " + PORT)});