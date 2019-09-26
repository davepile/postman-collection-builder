console.log('Testing module: ./components/body - Body class');

const assert = require('assert');
const pcb = require('../../index');

// new Body must have params
assert.throws( ()=>{ new pcb.Body() }, "Body must have 'mode' and 'data' params");
assert.throws( ()=>{ new pcb.Body('sometext', '{}') }, "Parameter 'mode' must be value 'raw' or 'formdata'");
// assert.throws( ()=>{ new Body('formdata', '{}') }, "When parameter 'mode' is 'formdata', data must be instance of Formdata");

let mode = 'raw';
let jsonbody = '{ "name": "Frank" }';
let body = new pcb.Body(mode, jsonbody);
assert( body.mode === mode, "Parameter 'mode' not stored in property 'mode'");
assert( body.raw === jsonbody, "Parameter 'data' not stored in property 'raw'");

module.exports = body;