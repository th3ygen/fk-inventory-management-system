// write a function that connect to mongodb and return a promise
// using mongoose

const mongoose = require('mongoose');

const connect = (url) => {
  return new Promise((resolve, reject) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', (err) => {
      reject(err);
    });
    db.once('open', () => {
      resolve(mongoose.connection);
    });
  });
};

module.exports = { connect };