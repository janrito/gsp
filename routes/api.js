var express = require('express');
var router = express.Router();

function randomIntegers (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/* GET visitors stats. */
router.get('/visitors/:since?', function(req, res, next) {
  // generates maximum 12 points of fake user visitor data
  var max = 1000000,
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
    // calculate time bin
    time_bin = new Date(since_rounded.getTime() + (1000 * 60 * 5 * counter));

    // break if the bin is later than now
    if (time_bin > now) {
      break;
    }

    // break if already given 12 bins
    if (counter >= 12) {
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

/* GET office temperature. */
router.get('/temperature', function(req, res, next) {
  // generates fake temperature reading
  var max = 25,
    min = 15;

  res.json({
    'temperature': randomIntegers(min, max)
  });
});


/* GET weather forecast. */
router.get('/forecast', function(req, res, next) {
  // generates fake weather report
  var weather_conditions = ['umbrella',
                            'day-windy',
                            'day-snow-thunderstorm',
                            'storm-showers',
                            'day-sleet',
                            'day-sunny',
                            'day-sunny-overcast',
                            'night-sleet',
                            'night-alt-sleet',
                            'sleet',
                            'day-haze']
  var max = 35,
    min = -10;

  res.json({
    'weather_condition': weather_conditions[randomIntegers(0, weather_conditions.length - 1)],
    'temperature': randomIntegers(min, max)
  });
});


/* GET drinks supply. */
router.get('/drinks', function(req, res, next) {
  // generates fake drinks supply information
  var drinks = ['water',
                'cola',
                'coconut water',
                'lemonade',
                'beer',
                'wine']
  var max = 12,
    min = 0;

  var drink_supply = [];

  for (var i = 0; i < drinks.length; i++ ) {
    drink_supply.push({
      'drink_type': drinks[i],
      'quantity': randomIntegers(min, max)
    })
  }
  res.json(drink_supply);

});

/* GET days since the plants where last watered. */
router.get('/plants', function(req, res, next) {
  // generates fake number of days
  var max = 30,
    min = 0;

  res.json({
    'days': randomIntegers(min, max)
  });
});



module.exports = router;
