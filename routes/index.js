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
  console.log("irgendein Schmarn", req.body);
  Point.create({
    coordinates: req.body.coordinates
  }).then(() => {
    res.json();
  })
  .catch(err => {
    next(err)
  })
})


router.get('/toiletform', (req, res) => {
  res.render('toiletForm')
})


router.post('/toiletform', (req, res, next) => {
  console.log(req.body)
  Toilet.create({
    type: req.body.type, 
    isFree: req.body.isFree, 
    price: req.body.price, 
    cleanliness: req.body.cleanliness, 
    experience: req.body.experience, 
    soap: req.body.soap, 
    handDrying: req.body.handDrying, 
    features: req.body.features, 
    accessibility: req.body.accessibility, 
    image: req.body.image,
     
  })
  // .then
})





module.exports = router;
