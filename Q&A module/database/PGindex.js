const { Client } = require('pg')
const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'akuo34',
  database: 'qa_module',
  password: 'modestmouse34',
});

client
  .connect()
  .then(() => console.log('connected'))
  .catch(err => console.error('connection error', err))

module.exports = client;