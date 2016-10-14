var express = require('express');
var router = express.Router();
var passport = require('passport');
var passportConf = require('../../config/passport/Strategies/LocalStrategy');

/* GET home page. */
router.get('/', function(req, res, next) {
  	if (req.user) {
		return res.redirect('/');
	}else{
  		res.render('main/account/login', {
  		errors: req.flash('loginMessage')
  		});
  	}
});

router.post('/', passport.authenticate('local-login', {
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true
}));

module.exports = router;