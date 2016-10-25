var express = require('express');
var router = express.Router();
var Products = require('../../models/product');
var Cart = require('../../models/cart');

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

router.post('/:id', function(req, res, next){
	Cart.findOne({ owner: req.user._id }, function(err, cart){
		cart.items.push({
			item: req.body.product_id,
			price: parseFloat(req.body.TotalPrice),
			quantity: parseInt(req.body.quantity)
		});

		cart.total = (cart.total + parseFloat(req.body.TotalPrice)).toFixed(2);

		cart.save(function(err){
			if (err) return next(err);
			return res.redirect('/cart');
		});
	});
});

module.exports = router;