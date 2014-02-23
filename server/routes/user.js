var db = require('../models'),
	crypto = require('crypto');

/* private method used for encrypting password
   @password - password that needs to be encrypted
   @algorithm - algorithm used
   @key - key used
*/
var encryptPassword = function (password, algorithm, key) {
	var cipher = crypto.createCipher(algorithm, key);  
	var encrypted = cipher.update(password, 'utf8', 'hex') + cipher.final('hex');
	return encrypted;
}

exports.decryptPassword = function (encryptedPassword, algorithm, key) {
	var decipher = crypto.createDecipher(algorithm, key);
	var decrypted = decipher.update(encryptedPassword, 'hex', 'utf8') + decipher.final('utf8');
	return decrypted;
};

exports.createRandomToken = function(){
	crypto.randomBytes(48, function (ex, buf){
		console.log('buf', buf.toString());
		var text = buf.toString();
		return text;
	})
};

exports.register = function (req, res, next){
	db.User.create({
		username: req.body.username,
		password: encryptPassword(req.body.password, 'aes256', 'password')
	})
	.error(function (err){
		return next(err);
	})
	.success(function (user){
		res.send(200);
	});
};