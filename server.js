const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connection = require("./Script");
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  const getProduct = `SELECT * FROM winehouse.product`;
  connection.query(getProduct, (err, products) => {
    if (err) console.log(err);
    else res.send(products);
  });
});

app.get("/InicioSesion", (req, res) => {
  const getAccount = `SELECT * FROM winehouse.account WHERE (user_email = '${req.body.email}' AND user_password = '${req.body.password}'`;
  connection.query(getAccount, (err, account) => {
    if (err) console.log(err);
    else res.send(account);
  });
});

app.get("/item/Blanco", (req, res) => {
  const getWhite = `SELECT * FROM winehouse.product WHERE (href = '/item/Blanco')`;
  connection.query(getWhite, (err, products) => {
    if (err) console.log(err);
    else res.send(products);
  });
});

app.get("/item/Tinto", (req, res) => {
  const getRed = `SELECT * FROM winehouse.product WHERE (href = '/item/Tinto')`;
  connection.query(getRed, (err, products) => {
    if (err) console.log(err);
    else res.send(products);
  });
});

app.get("/item/Espumoso", (req, res) => {
  const getSparkling = `SELECT * FROM winehouse.product WHERE (href = '/item/Espumoso')`;
  connection.query(getSparkling, (err, products) => {
    if (err) console.log(err);
    else res.send(products);
  });
});

app.get("/item/Random", (req, res) => {
  const getRandom = `SELECT * FROM winehouse.product ORDER BY RAND() LIMIT 1`;
  connection.query(getRandom, (err, products) => {
    if (err) console.log(err);
    else res.send(products);
  });
});

app.listen(8080, () => {
  console.log("Running on port 8080");
});
