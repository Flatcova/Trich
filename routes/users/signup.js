var express = require('express');
var router = express.Router();
var User = require('../../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  	if (req.user) {
		return res.redirect('/');
	}else{
  		res.render('main/account/signup', {
  		errors: req.flash('errors')
		});
	}
});

router.post('/', function(req, res, next){
	var newUser = new User();

	// set the user's local credentials
	newUser.profile.local.name = req.body.name;
	newUser.profile.local.email    = req.body.email;
	newUser.profile.local.password = newUser.generateHash(req.body.password);

	User.findOne({ 'profile.local.email' : req.body.email }, function(err, existingUser){
		if (existingUser) {
			req.flash('errors', 'El correo ya ha sido utilizado, intenta otro diferente.');
			return res.redirect('/signup');
		}else{
			// save the user
			newUser.save(function(err) {
		    	if (err) next(err);
		    	return res.redirect('/login');
			});
		}
	});
});

module.exports = router;