var express = require('express');
var router = express.Router();
var Products = require('../../models/product');

/* GET home page. */
router.get('/:id', function(req, res, next) {
  Products.findById({ _id : req.params.id }, function(err, product){
  	if (err) return next(err);
  	res.render('main/products/product', {
  		product: product,
	  	errors: req.flash('errors')
	  });
  });
});

module.exports = router;
