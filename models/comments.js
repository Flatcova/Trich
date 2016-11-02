var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentsSchema = new Schema({
	comment: [{
		grade: { type: Number, default:0 },
		name: {type:String, unique: true},
		comment: String,
		date: { type: Date, default: Date.now }
	}]
});

module.exports = mongoose.model('Comments', CommentsSchema);