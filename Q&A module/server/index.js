const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const router = require('./router.js');
const port = 8000;


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

app.use('/api', router);
// app.get('/', (req, res) => res.send('Hello World!'));

app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

