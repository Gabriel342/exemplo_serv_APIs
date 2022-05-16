require('./database/mongodb');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/indexRouter');
var pratoRouter = require('./routes/pratoRouter');
var categoriaRouter = require('./routes/categoriaRouter');
var pedidoRouter = require('./routes/pedidoRouter');
var produtoRouter = require('./routes/produtoRouter');
var statusRouter = require('./routes/statusRouter');
var usuarioRouter = require('./routes/usuarioRouter');
var clienteRouter = require('./routes/clienteRouter');
var perfilRouter = require('./routes/perfilRouter');
var loginRouter = require('./routes/loginRouter');
var lojaRouter = require('./routes/lojaRouter');

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/auth', loginRouter);
app.use('/prato', pratoRouter);
app.use('/usuarios', usuarioRouter);
app.use('/clientes', clienteRouter);
app.use('/categorias', categoriaRouter);
app.use('/pedidos', pedidoRouter);
app.use('/produtos', produtoRouter);
app.use('/perfis', perfilRouter);
app.use('/status', statusRouter);
app.use('/lojas', lojaRouter);

// Recursos de upload.
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, arquivo, callback) {
    callback(null, 'public/fotos/');
  },
  filename: function (req, arquivo, callback) {
    callback(null, arquivo.originalname);
  }
})
const upload = multer({ storage: storage });

app.post("/upload", upload.single('arquivo'), (req, res) => {
  res.status(200).send();
})

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
