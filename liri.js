
var Twitter = require("twitter");


var twitterKeysFile = require("./keys.js");

var spotify = require("spotify");


var request = require("request");

var fs = require("fs");



var action = process.argv[2];

var argument = "";


doSomething(action, argument);


function doSomething(action, argument) {

	argument = getThirdArgument();

	switch (action) {
		
	
		case "my-tweets": 
		getMyTweets();
		break;

		
		case "spotify-this-song":
		
		var songTitle = argument;

		if (songTitle === "") {
			lookupSpecificSong();

		} else {
			
			getSongInfo(songTitle);
		}
		break;

		
		case "movie-this":

		var movieTitle = argument;

		if (movieTitle === "") {
			getMovieInfo("Mr. Nobody");

	
		} else {
			getMovieInfo(movieTitle);
		}
		break;

		case "do-what-it-says": 
		doWhatItSays();
		break;
	}
}

function getThirdArgument() {

	argumentArray = process.argv;

	for (var i = 3; i < argumentArray.length; i++) {
		argument += argumentArray[i];
	}
	return argument;
}

function getMyTweets() {
	

	var client = new Twitter(twitterKeysFile.twitterKeys);

	var params = {q: '@Z18182', count: 20};

	
	client.get('search/tweets', params, function(error, tweets, response) {
	  if (!error) {

	  
	  	for (var i = 0; i < tweets.statuses.length; i++) {
	  		var tweetText = tweets.statuses[i].text;
	  		logOutput("Tweet Text: " + tweetText);
	  		var tweetCreationDate = tweets.statuses[i].created_at;
	  		logOutput("Tweet Creation Date: " + tweetCreationDate);
	  	}
	  } else {
	  	logOutput(error);
	  }
	});
}