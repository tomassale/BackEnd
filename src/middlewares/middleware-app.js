const express = require('express');
const pino = require('pino');

const app = express();

//Logger Pino
const loggerError = pino('error.log');
const loggerWarn = pino('warning.log');
const loggerInfo = pino();

loggerError.level = 'error';
loggerWarn.level = 'warn';
loggerInfo.level = 'info';

//Middlewares aplicacion
app.use((req, res, next) => {
  loggerInfo.info(`INCOMING REQUEST ==> Route: ${req.url}, Method: ${req.method}`)
  next()
});

app.use('*', (req, res) => {
  loggerWarn.warn('Wrong path')
  loggerInfo.warn('Wrong path')
  res.send('Ruta incorrecta')
});