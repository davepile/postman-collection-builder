console.log('Testing module: ./components/header_test - Header class');

const assert = require('assert');
const pcb = require('../../index');

let key = 'content-type';
let value = 'application/json';
let header1 = new pcb.Header(key, value);

assert(header1.key === key, "'key' parameter not stored in 'key' property");
assert(header1.key === header1.name, "'name' property and 'key' property must be same value");
assert(header1.value === value, "'value' parameter not stored in 'value' property");
assert(header1.type === 'text', "'type' property must be value 'text'");

let header2 = new pcb.Header('host', 'www.postman.com');


module.exports.header1 = header1;
module.exports.header2 = header2;