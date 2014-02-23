var db      = require('./server/models'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	userRoute = require('./server/routes/user');

module.exports =  function (app, passport) {
	passport.use(new LocalStrategy({usernameField: 'username', passwordField: 'password'},
		function (username, password, done) {
			db.User.find({where: {username: username}}).done(function (error, user) {
				if(error) return done(error);
				if (!user) return done(null, false, {message: 'unknown user'});
				if (userRoute.decryptPassword(user.password, 'aes256', 'password') != password) {
					return done(null, false, {message: 'invalid password'});
				}
				return done(null, user);
			});
		}
	));

	passport.serializeUser(function (user, done) {
		done(null, user);
	});

	passport.deserializeUser(function (user, done) {
		done(null, user);
	});
}