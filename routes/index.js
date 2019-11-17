const express = require('express');
const router  = express.Router();
const Point = require('../models/Point');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});


router.get('/api/points', (req, res, next) => {
  Point.find()
  .then(points => {
    res.json(points)
  }).catch(err => {
    next(err)
  })
})

router.post('/api/points', (req, res, next) => {
  console.log(req.body);
  Point.create({
    coordinates: req.body.coordinates
  }).then(() => {
    res.json();
  })
  .catch(err => {
    next(err)
  })
})



module.exports = router;
