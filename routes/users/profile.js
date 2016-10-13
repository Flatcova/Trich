var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if (!req.user) {
		return res.redirect('/');
	}else{
	  res.render('main/account/profile', {
	  	errors: req.flash('errors')
	  });
	}
});

module.exports = router;
