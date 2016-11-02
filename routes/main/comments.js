var express = require('express');
var router = express.Router();
var Comments = require('../../models/comments');

/* GET home page. */
router.get('/', function(req, res, next) {
	Comments.find({}, function(err, comments){
		console.log(comments);
	  	if (err) return next(err);
	  	res.render('main/comments', {
	  		comments: comments,
		  	errors: req.flash('errors')
		  });
	  });
});

router.post('/', function(req, res, next){
	Comments.find({}, function(err, comments){

		comments[0].comment.push({
			grade: req.body.grade,
			name: req.body.name,
			comment: req.body.comment,
		});

		console.log(comments);

		comments[0].save(function(err){
			if (err) return next(err);
			return res.redirect('/comments');
		});
	});
});

module.exports = router;
