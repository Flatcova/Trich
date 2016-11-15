var express = require('express');
var router = express.Router();
var moment = require('moment');
var Order = require('../../models/orders');
var Cart = require('../../models/cart');

/* GET home page. */
router.get('/', function(req, res, next) {
	if (!req.user) {
		return res.redirect('/');
	}else{
		Order.find({ owner: req.user._id },function(err, foundOrder){
			if (err) next(err);
			res.render('main/account/orders', {
				orders: foundOrder,
				moment: moment,
	  			errors: req.flash('loginMessage')
	  		});
		});
	}
});

router.get('/:id', function(req, res, next){
	if (!req.user){
		return res.redirect('/');
	}else{
		Order
			.findById({ _id : req.params.id })
			.populate('items.item')
			.exec(function(err, foundOrder){
				if (err) next(err);
				res.render('main/account/order', {
					moment: moment,
					order: foundOrder
				});
			});
	}
});

router.post('/create/:idcart', function(req, res, next){

	Cart.findById({ _id : req.params.idcart }, function(err, foundCart){
		if (err) next(err);

		var objeto = {
			owner: foundCart.owner,
			total: foundCart.total,
			items: foundCart.items
		};

		var order = new Order(objeto);

		order.save(function(err, neworder){
			if (err) next(err);
			foundCart.items=[];
			foundCart.total=0;
			foundCart
				.save(function(err, update){
					if(err) next(err);
				});
			res.redirect('/order-confirmation');
		});
	});
});


module.exports = router;
