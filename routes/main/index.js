var express = require('express');
var router = express.Router();
var Products = require('../../models/product');

/* GET home page. */
router.get('/', function(req, res, next) {
	Products.find({}, function(err, products){
	  	if (err) return next(err);
	  	res.render('main/index', {
	  		products: products,
		  	errors: req.flash('errors')
		  });
	  });
});

module.exports = router;
