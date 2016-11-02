var express = require('express');
var router = express.Router();
var User = require('../../models/user');

router.get('/', function(req, res, next) {
	if (!req.user) {
		return res.redirect('/login');
	}else{
		User
			.findOne({ _id: req.user._id })
			.populate('wishlist.items')
			.exec(function(err, wish){
				if (err) return next(err);
				res.render('main/account/wishlist', {
					message: req.flash('remove'),
					wish: wish
				});
			});
	}
});

router.post('/remove', function(req, res, next){
	User
		.findOne({ _id : req.user._id }, function(err, wish){

			wish.wishlist.pull(String(req.body.item));

			wish.save(function(err, found){
				if (err) return next(err);
				req.flash('remove', 'El articulo fue removido exitosamente');
				res.redirect('/wishlist');
			});
		});
});
module.exports = router;