var express = require('express');
var router = express.Router();
var User = require('../../models/user');
var _ = require('lodash');
var Products = require('../../models/product');
var Cart = require('../../models/cart');
var co = require('co');

var Productos = co.wrap(function* (req) {
	try{
		var parrallel = yield [
			Products.findById({ _id : req.params.id }).exec()			
		];

		console.log('parrallel', parrallel);

		return yield Products.findById({ _id : req.params.id }).exec();
	}catch(e){
		return Promise.reject(e);
	}
});

/* GET home page. */
router.get('/:id', function(req, res, next) {
	Productos(req)
	.then((product) => {
		res.render('main/products/product', {
	  		product: product
		  });
	},next);
});

var EncontrarCarro = co.wrap(function* (req){
	try{
		return yield Cart.findOne({ owner: req.user._id }).exec();
	}catch(e){
		return Promise.reject(e);
	}
});

var SaberSiExiste = co.wrap(function* (req){
	var productIndex = _.findIndex(cart.items);
	try{
		return yield found.item == req.body.product_id;
	}catch(e){
		return Promise.reject(e);
	}
})

var Funcionamiento = co.wrap(function* (req){
	if(productIndex == -1){
		cart.items.push({
			item: req.body.product_id,
			price: parseFloat(req.body.TotalPrice),
			quantity: parseInt(req.body.quantity)
		});	
	} else {
		cart.items[productIndex].quantity += parseInt(req.body.quantity);
		cart.items[productIndex].price += parseFloat(req.body.TotalPrice);
	}
			
	cart.total = (cart.total + parseFloat(req.body.TotalPrice)).toFixed(2);

	try{
		return yield cart.save().exec();
	}catch (e){
		return Promise.reject(e);
	}
});

router.post('/:id', function(req, res, next){
	EncontrarCarro(req)
	.then (SaberSiExiste (req))
	.then (Funcionamiento (req))
	.then (res.redirect('/cart'));

	// Cart.findOne({ owner: req.user._id }, function(err, cart){
	// 	var productIndex = _.findIndex(cart.items, function(found){
	// 		return found.item == req.body.product_id;
	// 	});

	// 	if(productIndex == -1){
	// 		cart.items.push({
	// 			item: req.body.product_id,
	// 			price: parseFloat(req.body.TotalPrice),
	// 			quantity: parseInt(req.body.quantity)
	// 		});	
	// 	} else {
	// 		cart.items[productIndex].quantity += parseInt(req.body.quantity);
	// 		cart.items[productIndex].price += parseFloat(req.body.TotalPrice);
	// 	}
			
	// 	cart.total = (cart.total + parseFloat(req.body.TotalPrice)).toFixed(2);

	// 	cart.save(function(err){
	// 		if (err) return next(err);
	// 		return res.redirect('/cart');
	// 	});
	// });
});

router.post('/:id/wishlist', function(req, res, next){

	User.findOne({ _id: req.user._id  }, function(err, user){
		for (var i = 0; i < user.wishlist.length; i++) {
			console.log(user.wishlist[i].item);
			if (user.wishlist[i].items == req.body.productid){
				return res.redirect('/wishlist');
				break;
			}
		};

		user.wishlist.push({
			items: req.body.productid,
		});
		
		user.save(function(err){
			if (err) return next(err);
			return res.redirect('/wishlist');
		});
	});
});
module.exports = router;