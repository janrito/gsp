var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Simple Office Dashboard',
    metatitle: 'Simple Office Dashboard',
    metadescription: 'A simple office dashboard' });
});

module.exports = router;
