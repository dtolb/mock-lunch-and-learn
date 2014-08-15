var request = require("request");
var nock = require("nock");

var payload = {
	stuff : "is a test",
	thats : "is an example"
};

var postRequest = {
	uri    : "http://www.mymock.com/examplePost",
	method : "POST",
	json   : payload
};

nock("http://www.mymock.com")
	.post("/examplePost", payload)
	.reply(201, function(uri, requestBody) {
		console.log(uri);
		console.log(requestBody);
		return "What you return here is the body of the response";
	});

request(postRequest);