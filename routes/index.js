var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hud', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/main', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/menu', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
