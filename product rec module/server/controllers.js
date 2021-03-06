const dbHelpers = require('../database/dbHelpers.js');
const QApair = require('../database/schema.js');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var controllers = {
  get: (req, res) => {
    dbHelpers.get(req.params.productID)
      .then((data) => {
        res.status(200).send(data)
      })
      .catch(err => {
        res.status(400).send(err)
      })
  },
  post: (req, res) => {
    res.status(201).send(req.params.productID);
  }
};

module.exports = controllers;