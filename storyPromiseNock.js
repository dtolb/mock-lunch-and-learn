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

function promisePostNock() {
	var deferred = Q.defer(); //Create our Deferred Promise
	nock("http://www.mymock.com")
		.post("/examplePost")
		.reply(201, function () {
			/*
			* .reply is not called until the nock has fired
			* so we can fulfill our promise here!
			*/
			random = "/" + randomstring.generate();
			deferred.resolve(random);
			return random;
		}, returnHeaders);
	return deferred.promise; //Return the Promise
}

function promiseGetNock(path) {
	var deferred = Q.defer(); //Create our Deferred Promise
	nock("http://www.mymock.com")
		.get(path)
		.reply(200, function () {
			/*
			* .reply is not called until the nock has fired
			* so we can fulfill our promise here!
			*/
			deferred.resolve();
			return "Got That Nock Body!";
		});
	return deferred.promise; //Return the Promise
}

promisePostNock()
.then(function (path) {
	promise = promiseGetNock(path); //Need to pass the promise as the return value
	getURI = "http://www.mymock.com" + path;
	request.get(getURI, function (error, response, body) {
		console.log("-----------GET Response Body------------");
		console.log(body);
		console.log("------------------------------------");
	});
	return promise; //Return here so we can keep going after the request is made
})
.done();

request(postRequest, function (error, response, body) {
	console.log("-----------POST Response Body------------");
	console.log(body);
	console.log(response.headers);
	console.log("------------------------------------");
});

