const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const items = require('./routes/items');
const customers = require('./routes/customers')
const transactions = require('./routes/transactions')

const app = express();

// Mongoose setup
const mongoose = require('mongoose');
mongoose.connect('mongodb://admin:1234@ds247838.mlab.com:47838/yatta');


// uncomment after placing your favicon in /public
app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/items', items);
app.use('/customers', customers);
app.use('/transactions', transactions)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
