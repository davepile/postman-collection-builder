console.log('Testing module: ./components/url_test - Url class');

const assert = require('assert');
const pcb = require('../../index');

let urlstring = "http://echo.postman.com:8080/param1/target/";
let url = new pcb.Url(urlstring);

assert( url.raw === urlstring, "Parameter 'urlstring' is not stored in property 'raw'");

assert( url.protocol === 'http', "url.protocal should be equal to 'http'");

assert( Array.isArray(url.host), "url.host must be an Array");
assert( url.host.length === 1, "url.host should have one elements");    
assert( url.host[0] === 'echo.postman.com', "url.host[0] should be equal to 'echo.postman.com'");

assert( url.port === '8080', "url.port should be equal to '8080'");

assert( Array.isArray(url.path), 'url.path must be an Array');
assert( url.path.length === 2, "url.path length should be two");
assert( url.path[0] === 'param1', "url.path[0] should be equal to 'param1'");
assert( url.path[1] === 'target', "url.path[1] should be equal to 'target'");

// Test postman params in url string
let url2 = new pcb.Url('http://localhost:9000/tables/{{path}}');
assert( url2.path[url2.path.length - 1] === '{{path}}', "The last element of url2.path should be '{{path}}'");

// encode the postman params
url2 = new pcb.Url('http://localhost:9000/tables/{{path}}', true);
assert( url2.path[url2.path.length - 1] === "%7B%7Bpath%7D%7D", "The last element of url2.path should be uriEncoded '%7B%7Bpath%7D%7D'");

module.exports = url;