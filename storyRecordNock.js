var request = require("request");
var nock = require("nock");

nock.recorder.rec({
output_objects : true,
dont_print     : true
});

request.get("http://www.google.com");
request.get("http://wwww.mysite.com");
request.get("http://www.github.com");

nocks = nock.recorder.play();

nocks.forEach(function(n) {
console.log(n.scope);
console.log(n.method);
console.log(n.path);
console.log(n.status);
//console.log(n.headers);
});