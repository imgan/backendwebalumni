require('dotenv').config();

const mongoose = require('mongoose');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const UserRouter = require('./routes/api/users');
const AlamatRouter = require('./routes/api/alamat');
const AgendaRouter = require('./routes/api/agenda');
const BeritaRouter = require('./routes/api/berita');

const app = express();


const dbRoute = process.env.URL_DATABASE;

// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true },
);
const db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/agenda', AgendaRouter);
app.use('/api/alamat', AlamatRouter);
app.use('/api/users', UserRouter);
app.use('/api/berita', BeritaRouter);
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
