// BASE SETUP

var express    = require('express');
var groveSensor = require('jsupm_grove');
var m = require('mraa');
var morgan     = require('morgan');
var utils      = require('./utils');
var port       = process.env.PORT || 8010; // set our port
var app        = express();

app.use(morgan('dev')); // log requests to the console
var light = new groveSensor.GroveLight(0);

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	next();
});
router.get('/hello', function(req, res) {
    res.json({message: "Hi There!"})
});
router.get('/blink', function(req, res) {
	console.log('Starting Blink Now')
	var pin = req.query.pinNumber ? req.query.pinNumber : 13
	var blinks = req.query.blinks ? req.query.blinks : 5
    utils.blinker(pin, false, blinks,0)
    res.status(200).end()
});
router.get('/lightSensor', function(req, res) {
	var value = 0
	try{
		value = light.value()
	}catch(error){
		value = 0
	}
	res.json({value: value})
});
router.get('/ip', function(req, res){
    console.log('getting IP')
    var ip = utils.getIP()
    res.json({value: ip})
});
app.use('/', router);

// START THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port)



