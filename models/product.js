var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
	name: {type:String, unique: true},
	price: {type: Number, get: getPrice, set: setPrice },
	image: String,
	description: String
});

function getPrice(price){
    return (price/100).toFixed(2);
}

function setPrice(price){
    return price*100;
}

// set price back to normal
ProductSchema.methods.getPrice = function(price) {
    return (price/100).toFixed(2);
};

// set price to cents.
ProductSchema.methods.setPrice = function(price) {
    return price*100;
};

module.exports = mongoose.model('Product', ProductSchema);