const createError = require('http-errors');
const express = require('express');
const jwt = require("jsonwebtoken");
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productosRouter = require('./routes/productos');
const categoriasRouter = require('./routes/categorias');
const loginRouter = require('./routes/login');


const app = express();

app.set("secretKey", "123"); //Se pone acá para que este dato se pueda poner en toda la aplicación

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/productos', verifyToken, productosRouter); //primero se ejecuta la funcion verify token y luego productos router
app.use("/categorias", categoriasRouter);
app.use('/login', loginRouter);

//TOKEN
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "Token must be provided" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, req.app.get("secretKey"), function (error, payload) {
    if (error) {
      return res.status(401).json({ message: error.message });
    } else {
      console.log(payload);
      next();
    }
  });
}

app.verifyToken = verifyToken;


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
  res.render('error');
});

module.exports = app;
