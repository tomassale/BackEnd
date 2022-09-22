const express = require("express"),
  app = express(),
  PORT = 8080,
  routes = require("./routes/");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", routes);

app.get("/api", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});