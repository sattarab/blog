var routes  = require('./server/routes'),
	userRoute = require('./server/routes/user'),
	fs = require('fs'),
	mailer = require('express-mailer'),
	db = require('./server/models');

exports = module.exports = function (app, passport) {
	app.get('/', function(req, res){
	  res.render('index');
	});

	app.post('/api/register', userRoute.register);

	app.get('/api/loggedin', function(req, res) {
	  res.send(req.isAuthenticated() ? req.user : '0');
	});

	app.post('/api/login', passport.authenticate('local'), function(req, res) {
	  console.log('The request user is ', req.user);
	  res.send(req.user);
	});

	app.post('/api/logout', function(req, res){
	  req.logOut();
	  res.send(200);
	});

	app.post('/api/forgot', function(req, res) {
	  console.log('The username is ', req.body.username);
	  db.User.find({where : {username: req.body.username}})
	  .then(function (user) {
		if (user == null)
		{
			res.send(500, 'user not found');
			return;
		}
		
		res.send(200);

		app.mailer.send('email', {
			to: user.username,
			subject: 'reset password',
			otherProperty: 'Other Property'
			}, function (err) {
			if (err) {
			  console.log(err);
			  return;
			}
			console.log('Email sent')
		})
	  })
	  .error(function (err){
		console.log(err);
	  })
	});

	app.get('/api/home');
}