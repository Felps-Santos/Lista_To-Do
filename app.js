var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

var cadastroRouter = require('./routes/cadastro');
var homeRouter = require('./routes/home');

var app = express();

// Configuração do body-parser
app.use(bodyParser.urlencoded({ extended: true })); // True - receber dados via POST

const url = 'mongodb://localhost:27017';
const dbName = 'todo'

// Conexão com o banco de dados Mongoose
mongoose.connect('mongodb://localhost:27017/todo', {})
.then(() => {console.log('Conexão com o MongoDB realizada com sucesso!')})
.catch(err => console.log('Erro: ', err));

// Porta - mostrar se deu certo
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/cadastro', cadastroRouter);
app.use('/home', homeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
