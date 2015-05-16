var express = require('express');
var router = express.Router();

function randomIntegers (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + max);
}

/* GET users listing. */
router.get('/visitors', function(req, res, next) {
  // generates fake user visitor data
  var max = 100000000,
    min = 0;

  var visitors = randomIntegers(min, max);

  res.json({'visitors': visitors});
});

module.exports = router;
