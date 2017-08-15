console.log('The bot is waking up');
// import the twit library
var Twit = require('twit');
var config = require('./config');

// create twit object
var T = new Twit(config);