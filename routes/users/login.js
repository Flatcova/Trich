var express = require('express');
var router = express.Router();
var passport = require('passport');
var passportConf = require('../../config/passport/Strategies/LocalStrategy')

/* GET home page. */
router.get('/', passportConf.isAuthenticated, function(req, res, next) {
  	res.render('main/account/login', {
  	errors: req.flash('loginMessage')
  	});
});

router.post('/', passport.authenticate('local-login', {
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true
}));

module.exports = router;