var express = require('express');
var router = express.Router();
var Cart = require('../../models/cart');

/* GET home page. */
router.get('/', function(req, res, next) {
	if (!req.user) {
		return res.redirect('/login');
	}else{
		Cart
			.findOne({ owner: req.user._id })
			.populate('items.item')
			.exec(function(err, foundCart){
				if (err) return next(err);
				res.render('main/account/cart', {
					message: req.flash('remove'),
					cart: foundCart
				});
			});
	}
});

router.post('/remove', function(req, res, next){
	Cart
		.findOne({ owner : req.user._id }, function(err, cart){
			cart.items.pull(String(req.body.item));

			cart.total = (cart.total - parseFloat(req.body.price)).toFixed(2);
			cart.save(function(err, found){
				if (err) return next(err);
				req.flash('remove', 'El articulo fue removido exitosamente');
				res.redirect('/cart');
			});
		});
});

module.exports = router;
