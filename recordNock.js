var request = require("request");
var nock = require("nock");

nock.recorder.rec();

request.get("http://www.github.com");
request.get("http://www.dtolb.com");

