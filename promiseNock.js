var request = require("request");
var nock = require("nock");
var randomstring = require("randomstring");
var Q = require("q");

var payload = {
	stuff  : "is a test",
	thats  : "is an example",
	random : randomstring.generate()
};

var postRequest = {
	uri    : "http://www.mymock.com/examplePost",
	method : "POST",
	json   : payload
};

var returnHeaders = {
	location : "http://www.putYourLocationHere.com"
};

function promiseNock() {
	var deferred = Q.defer(); //Create our Deferred Promise
	nock("http://www.mymock.com")
		.post("/examplePost")
		.reply(201, function () {
			/*
			* .reply is not called until the nock has fired
			* so we can fulfill our promise here!
			*/
			deferred.resolve("Promise Fulfilled!!!");
			return "Promise Nock Body!";
		}, returnHeaders);
	return deferred.promise; //Return the Promise
}

promiseNock()
.then(function(someValue){
	console.log(someValue);
})
.done();

request(postRequest, function (error, response, body) {
	console.log("-----------Response Body------------");
	console.log(response.body);
	console.log(response.headers);
	console.log("------------------------------------");
});