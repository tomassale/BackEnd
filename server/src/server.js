require('dotenv').config();

//Importacion de tecnologias
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');

const passport = require('passport');
require("./routes/middlewares/passportStrategiesLocal.js");
require("./routes/middlewares/passportStrategiesJwt.js");

//Importacion routes
const { routerCart } = require('./routes/routeUser.js');
const { routerProduct } = require('./routes/routeProduct.js');
const { routerUser } = require('./routes/routeCart.js');

//Configuracion express
const app = express();

app.use('/favicon.ico', express.static('public/images/favicon.ico'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Middlewares passport
app.use(passport.initialize());

app.use(routerUser);
app.use('/product', routerProduct);
app.use('/cart', routerCart);

//Puerto abierto
app.listen(process.env.PORT || 8080, () => {
  console.log(`Running on port ${PORT} - Pid Worker ${process.pid}`);
});