const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const request = require('request');

const knex = require('./db/knex');

app.use(express.static('public'));

const ejs = require('ejs');
app.set('view engine', 'ejs');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const conditions = require('./routes/conditions');
app.use('/', conditions);

const preferences = require('./routes/preferences');
app.use('/', preferences);

const queries = require('./db/queries');




app.listen(port, () => {
  console.log('Listening on port ' + port + '...');
});
