var restify = require('restify');
var randomicWeather = require('./randomicWeather.js');

var server = restify.createServer();
var port = process.env.PORT || 9003;
process.env.TZ = 'Brazil/East';

server.use(restify.bodyParser({ mapParams: true }));

var weather = {};

weather.provider = function() {
	return "Third Weather Provider";
};

weather.hello = function(req, res, next) {
	res.send('Hello, this is the third weather provider' + req.params['param'] + '!');
	next();
};

weather.now = function(req, res, next) {
	res.json(randomicWeather.now(weather.provider()));
	next();
};


server.get('/hello/:param', weather.hello);
server.post('/weather', weather.now);

server.listen(port, function() {
  console.log('%s listening at server port %s', 'Third Weather Info', port);
});