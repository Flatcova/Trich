var express = require('express');
var router = express.Router();
var Order = require('../../models/orders');

/* GET home page. */
router.get('/', function(req, res, next) {
	if (!req.user) {
		return res.redirect('/');
	}else{
	  res.render('main/confirmation');
	}
});

module.exports = router;
