console.log('Testing module: ./components/request_test - Request class ');

const assert = require('assert');
const pcb = require('../../index');

const url = require('./url_test');
const headers = require('./headers_test');
const body = require('./body_test');

let getUrlstring = 'https://postman-echo.com/get';
let postUrlstring = 'https://postman-echo.com/post';

// Test constructor
    // member assignments
let request = new pcb.Request(getUrlstring);
assert( (new pcb.Request(getUrlstring, "PUT")).method === 'PUT', "Property 'method' should be 'PUT'");
assert( request.method === 'GET', "Default value for property 'method' should be 'GET'");
assert( request.url.raw === getUrlstring, "request.url.raw property should be '" + getUrlstring + "'");
assert( Array.isArray(request.header), "request.header should default to []");
assert( request.header.length === 0, "request.header should default to length 0");

    // parameter url must be a string url or an instance of Url
request = new pcb.Request(url);
assert( request.url === url, "Parameter 'url' must be equal to request.url");
assert.throws( ()=> { new Request() }, "Parameter url is required");
assert.throws( ()=> { new Request([getUrlstring]) }, "Parameter 'url' must be a string or instance of Url (not an array)");

    // parameter header must be Header or null/undefined
request = new pcb.Request(getUrlstring, 'GET', headers);
assert( request.header === headers.header, "request.header should be equal to 'headers.header'");  // 
    // passing an ad-hoc array should not work
assert.throws( ()=>{ new pcb.Request(getUrlstring, 'GET', ['content-type', 'application/json'])}, "Parameter 'headers' must be instance of Header or null/undefined" );

    // parameter body must be instance of Body
request = new pcb.Request(postUrlstring, 'POST', headers, body);
assert( request.body === body, "request.body must be equal to parameter 'body'");
assert.throws( ()=>{ new pcb.request(getUrlstring, 'GET', hContentType, '{ "name": "Dave" }') }, "Parameter 'body' must be an instance of body or null/undefined");

// test setUrl
assert( request.setUrl(url) === request, "method setUrl must return a reference to itself");
assert( request.url === url, "request.url should equal url");

// addHeader
assert( request.addHeader(new pcb.Headers('testheader', 'testvalue')) === request , "method addHeader must return a reference to itself")

module.exports = request;