var express = require('express');
var router = express.Router();
var Products = require('../../models/product');

router.get('/:page', function(req, res, next){
	var perPage = 8;
	var page = req.params.page;

	Products
		.find({})
		.skip( perPage * page)
		.limit(perPage)
		.exec(function(err, products){
			if (err) return next(err);
			Products.count().exec(function(err, count){
				if (err) return next(err);
				res.render('main/products/catalog', {
					products: products,
					page: page,
					pages: count / perPage,
					errors: req.flash('errors')
				});
			});
		});
});

module.exports = router;
