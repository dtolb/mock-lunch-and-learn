var request = require("request");
var nock = require("nock");
var randomstring = require("randomstring");

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

var newRequestBody = "What you return here is NOW the body of the request";

nock("http://www.mymock.com")
	.filteringRequestBody(function (requestBody){
		console.log("-------Filtering Request Body-------");
		console.log(requestBody);
		console.log("------------------------------------");
		return newRequestBody;
	})
	.post("/examplePost", newRequestBody)
	.reply(201, "Hello Nock!", returnHeaders);

request(postRequest, function (error, response, body) {
	console.log("-----------Response Body------------");
	console.log(response.body);
	console.log(response.headers);
	console.log("------------------------------------");
});