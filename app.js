var express = require('express'),
	http    = require('http'),
	path    = require('path'),
	db      = require('./server/models'),
	passport = require('passport'),
	sass = require('node-sass'),
	mailer = require('express-mailer');


var auth = function (req, res, next) { 
	if (!req.isAuthenticated()) 
		res.send(401); 
	else 
		next();
};

var app = express();

mailer.extend(app, {
  from: 'c2sattara1@gmail.com',
  host: 'smtp.gmail.com',
  secureConnection: true, 
  port: 465, 
  transportMethod: 'SMTP', 
  auth: {
	user: 'c2sattara1@gmail.com',
	pass: 'city00292'
  }
});

app.configure(function(){
	app.set('port', 8000);
	app.set('views', path.join(__dirname, '/client/views'));
	app.set('view engine', 'ejs');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(express.cookieParser('qip secret'));
	app.use(
		sass.middleware({
			src: __dirname + '/sass',
			dst: __dirname + '/client/stylesheets',
			debug: true
		})
	);
	app.use(express.session());
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'client')));
})

if ('development' === app.get('env')) {
  app.use(express.errorHandler())
}

require('./passport')(app, passport);
require('./routes')(app, passport);

/*var superagent = require('superagent');
var testUser = superagent.agent();
testUser
  .post('http://localhost:8000/api/register')
  .send({ id: 1, username: 'sattarab', password: '123' })
  .end(function(err, res) {
	console.log(err);
  });*/

db.sequelize
  .sync({ force: false})
  .complete(function(err) {
	if (err) {
	  throw err
	} else {
	  http.createServer(app).listen(app.get('port'), function(){
		console.log('Express server listening on port ' + app.get('port'))
	  })
	}
  })