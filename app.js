var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const connectDB = require('./config/database');
const { errorMiddleware } = require('./middleware/errorMiddleware');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
<<<<<<< HEAD
var productsRouter = require('./routes/product');
var eventRouter = require('./routes/events');
var requestRouter = require('./routes/request')

=======
var eventRouter = require('./routes/events')
let itemsRouter = require('./routes/items');
>>>>>>> origin/toan_dev

var app = express();
connectDB();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/events', eventRouter);
<<<<<<< HEAD
app.use('/request', requestRouter);
=======
app.use('/items', itemsRouter);
>>>>>>> origin/toan_dev


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorMiddleware);

module.exports = app;
