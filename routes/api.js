var express = require('express');
var router = express.Router();

function randomIntegers (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + max);
}

/* GET users listing. */
router.get('/visitors/:since?', function(req, res, next) {
  // generates maximum 20 points of fake user visitor data
  var max = 100000000,
    min = 0,
    // get since parameter, default to an hour ago
    now = new Date(),
    since_time = ((req.params.since)?
          new Date(req.params.since):
          new Date(now.getTime() - (1000 * 60 * 60)));


  // since rounded to the nearest 5th minute
  var since_rounded = new Date(since_time - (since_time.getTime() % (1000 * 60 * 5))),
   counter = 0,
   visitors = [],
   total_visitors = 0;

   // generate random number of visitors for periods of 5 minutes
  while (true) {
    time_bin = new Date(since_rounded.getTime() + (1000 * 60 * 5 * counter));
    if (time_bin > now) {
      break;
    }

    if (counter >= 20) {
      break;
    }

    var now_visitors = randomIntegers(min, max);
    visitors.push({
      'time': time_bin,
      'visitors': now_visitors
    });

    total_visitors += now_visitors;
    counter++;
  }



  res.json({
    'visitors': visitors,
    'total': total_visitors});
});

module.exports = router;
