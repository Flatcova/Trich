var express = require('express');
var router = express.Router();
var Product = require('../../../models/product');

router.get('/', function(req, res, next) {
  	if (req.user && (req.user.profile.admin === true)) {
		
		res.render('main/admin/add', {
  		errors: req.flash('errors')
		});
	}else{
  		return res.redirect('/');
	}
});

router.post('/', function(req, res, next){
	var newProduct = new Product();

	// set the user's local credentials
	newProduct.name = req.body.name;
	newProduct.price = newProduct.setPrice(req.body.price);
	newProduct.image = req.body.image;
	newProduct.description = req.body.description;

	Product.findOne({ 'name' : req.body.name }, function(err, product){
		if (product) {
			req.flash('errors', 'El producto ya se encuentra registrado.');
			return res.redirect('/admin');
		}else{
			// save the user
			newProduct.save(function(err) {
		    	if (err) next(err);
		    	req.flash('errors', 'El producto se registro correctamente.');
		    	return res.redirect('/admin');
			});
		}
	});
});

module.exports = router;