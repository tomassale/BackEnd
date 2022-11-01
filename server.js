import express from "express";
import routerCarrito from "./routes/routeCart.js";
import routerProductos from "./routes/routeProduct.js";

const PORT = 8080;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/productos", routerProductos);
app.use("/carritos", routerCarrito);

app.listen(PORT, () => console.log(`Running on port ${PORT}`));