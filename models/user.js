var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

// define the schema for our user model
var userSchema = Schema({
	wishlist: [{
		items: {type: Schema.Types.ObjectId, ref: 'Product'},
	}],
	profile: {
		admin : {type:Boolean, default: false},
		local            : {
	        name 	     : String,
	        email        : {type:String, unique: true},
	        password     : String
	    },
	    facebook         : {
	        id           : String,
	        token        : String,
	        email        : String,
	        name         : String
	    },
	    twitter          : {
	        id           : String,
	        token        : String,
	        displayName  : String,
	        username     : String
	    },
	    google           : {
	        id           : String,
	        token        : String,
	        email        : String,
	        name         : String
	    }
	}
	// history: [{
	// 	date: Date,
	// 	price: {type: Number, default: 0},
	//  item: {type: Schema.Types.ObjectId, ref: ''}
	// }],
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.profile.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);