const express = require('express');
const router = express.Router();
const request = require('request');
const knex = require('../db/knex');
const queries = require('../db/queries');

// get all users
router.get('/users', (req, res, next) => {
  knex('users')
  .then(users => {
    res.render('users', {users})
  })
  .catch(err => {
    next(err);
  })
})

// create a user
router.post('/users', (req, res, next) => {
  const { username } = req.body;
  knex('users')
  .insert({
    username: username
  })
  .then(() => {
    res.redirect('/users')
  })
})




module.exports = router;
