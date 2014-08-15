var request = require("request");
var nock = require("nock");

nock("http://www.mymock.com")
	.get("/exampleGet")
	.reply(200, function(uri, requestBody) {
		console.log(uri);
		console.log("Nock Replied");
		return "Nock Get Body";
	});

request.get("http://www.mymock.com/exampleGet", function (error, response, body) {
	console.log(body);
});