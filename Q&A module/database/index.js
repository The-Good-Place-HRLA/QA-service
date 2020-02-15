var mongoose = require('mongoose');
var QASchema = require('./schema.js')
mongoose.Promise = global.Promise;

var db = mongoose.connect('mongodb://localhost/QAdata', {useNewUrlParser: true})
  .then(() => console.log('db connected'))

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log('db connected');
//   seedData();
// });


// define the model
var QApair = mongoose.model('QApair', QASchema); // this is basically what you're naming your table

module.exports = QApair;