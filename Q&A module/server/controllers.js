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
  postQ: (req, res) => {
    dbHelpers.postQ(req.params.productID, req.body.newQuestion)
      .then(() => {
        res.status(201).send('posted question')
      })
      .catch(err => {
        res.status(401).send(err)
      });
  },
  postAns: (req, res) => {
    dbHelpers.postAns(req.params.productID, req.body.num, req.body.newAns)
      .then(() => {
        res.status(201).send('posted answer')
      })
      .catch(err => {
        res.status(401).send(err)
      });
  },
  sort: (req, res) => {
    dbHelpers.sort(req.body.productID, req.body.sort)
      .then((data) => {
        res.status(202).send(data)
      })
      .catch(err => {
        res.status(402).send(err)
      });
  },
  post: (req, res) => {
    
  },
  edit: (req, res) => {

  },
  delete: (req, res) => {

  }
};

module.exports = controllers;