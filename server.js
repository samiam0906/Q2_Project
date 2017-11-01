const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const request = require('request');

const knex = require('./db/knex');

app.use(express.static(__dirname + '/public'));

const ejs = require('ejs');
app.set('view engine', 'ejs');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const conditions = require('./routes/conditions');
app.use('/', conditions);

const users = require('./routes/users');
app.use('/', users);


const queries = require('./db/queries');


app.listen(port, () => {
  console.log('Listening on port ' + port + '...');
});
