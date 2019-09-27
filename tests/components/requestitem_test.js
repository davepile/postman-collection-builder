console.log('Testing module: ./components/requestitem_test - RequestItem class ');

const assert = require('assert');
const pcb = require('../../index');
const request = require('./request_test');

let name = 'basicGetRequest';
let getUrlstring = 'https://postman-echo.com/get';

// Test constructor
    // empty request
let requestitem = new pcb.RequestItem(name);
assert( requestitem.name === name, "requestitem.name should equal name");
assert(Object.entries(requestitem.request).length === 0 && requestitem.request.constructor === Object, "requestitem.request should be {}");
assert( Array.isArray(requestitem.response), "requestitem.response must be an array");
assert( requestitem.response.length === 0, "requestitem.response.length must be 0");
    // Request object
requestitem = new pcb.RequestItem(name, request);
assert( requestitem.request === request, "requestitem.request should be equal to request");
    // string url
requestitem = new pcb.RequestItem(name, getUrlstring);
assert( requestitem.request instanceof pcb.Request, "requestitem.request should be an instance of Request");
        // assume that requestitem.request being an instance of request and having used the Request constructor is proof that 
        // the Request is in order
   

// Test setRequest
assert( requestitem.setRequest(request) === requestitem, "requestitem.setRequest() must return a refernce to requestitem");
assert( requestitem.request === request, "setRequest should replace exising requestitem.request with new Request");

module.exports = requestitem;


