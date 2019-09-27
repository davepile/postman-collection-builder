console.log('Testing module: ./components/headers_test - Headers class ');

const assert = require('assert');
const pcb = require('../../index');

let header1 = require('./header_test').header1;
let header2 = require('./header_test').header2;

// create empty header with empty constructor
let headers = new pcb.Headers();

assert( Array.isArray(headers.header), 'Headers.header must be an array'); // must be = must always be
assert( headers.header.length === 0, 'Headers.header should be an empty array');   // should be - must be this time

// create headers with one header
let headerA = new pcb.Header('content-type', 'text/xml');
let headerB = new pcb.Header('authkey', 'abc123');

headers = new pcb.Headers([headerA]);
assert( Array.isArray(headers.header), 'Headers.header must be an array'); // must be = must always be
assert( headers.header.length === 1, 'Headers.header should be length 1');   // should be - must be this time
assert( headers.header[0] === headerA, 'Headers.header[0] should be headerA');

// adding a header 
assert( headers.addHeader(headerB) === headers, 'Headers.addHeader must return original Header Object');
assert( headers.header.length === 2, 'Headers.header should be length 2');
assert( headers.header[1] === headerB, 'Headers.header[1] should be headerB');

// add an ad-hoc header
let name = 'testhead';
let value = 'testvalue';
headers.addHeader(name, value);
assert( headers.header.length === 3, 'Headers.header length should be 3');
assert( headers.header[2].name === name, 'Ad hoc header name should be ' + name);
assert( headers.header[2].value === value, 'Ad hoc header value should be ' + value);

// set/ replace existing set of headers
headers.setHeaders([header1, header2]);
assert( headers.header.length === 2, 'Headers.headers length should be 2');
assert( headers.header[0] === header1, 'Headers.header[0] should be header1');
assert( headers.header[1] === header2, 'Headers.header[1] should be header2');

module.exports = headers;