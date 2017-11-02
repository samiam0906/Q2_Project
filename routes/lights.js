const express = require('express');
const router = express.Router();
const request = require('request');
const knex = require('../db/knex');
const queries = require('../db/queries');
const hue = require('../public/js/hue');

router.get('/users/:id', (req, res, next) => {
  console.log('hi');
  const id = req.params.id;
  knex('weatherlog')
  .where('user_id', id)
  .then(data => {
    console.log('!!!!!!!!!' + data);
    // let tempArr = Array.from(temps);
    // console.log(tempArr);
    // console.log('hi')
  })
  .catch(err => {
    next(err);
  })
})






function getAllTemps() {
  const id = event.target.id;
  return knex('weatherlog').select('temp')
  .where('user_id', id)
  .pluck('temp')
  .then(temps => {
    let tempArr = Array.from(temps);
    console.log(tempArr);
  })
}



let mildTemps = [];

function getMildTemps() {
  return knex('weatherlog').select('temp')
    .where('temp', '>', 32)
    .andWhere('temp', '<=', 65)
    .pluck('temp')
    .then(temps => {
      let mildTempArr = Array.from(temps);
      for (var i = 0; i < mildTempArr.length; i++) {
        mildTemps.push(mildTempArr[i]);
      }
      console.log(mildTemps);
    })
}



module.exports = router;
