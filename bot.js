console.log('BEEP BOOP I\'m waking up\n');

// import the twit library
var Twit = require('twit');
var config = require('./config');

// create twit object
var twiit = new Twit(config);

// getting
var params = {
	q: 'puppy',	// word to look for
	count: 5 	// amount of tweets back
}

twiit.get('search/tweets', params, getData);

function getData(err, data, response)
{
	var tweets = data.statuses;
	for(var i = 0; i < tweets.length; i++)
	{
		console.log(tweets[i].text);
	}
}

// posting
function sendTweet(text)
{
	var tweet = {
		status: text
	}

	twiit.post('statuses/update', tweet, tweeted);

	function tweeted(err, data, response)
	{
		if(err)
		{
			console.log("Something bad happened!");
		}
		else
		{
			console.log("It's working!");
		}
	}
}

// streaming

// set up a user stream
var stream = twiit.stream('user');

// if someone follows me
stream.on('follow', followed);

function followed(eventMessage)
{
	console.log("Follow event trigggered!");
	var name = eventMessage.source.name;
	var screenName = eventMessage.source.screen_name;
	sendTweet('@' +screenName+ ' thanks for the follow. Do you like chicken?');
}
