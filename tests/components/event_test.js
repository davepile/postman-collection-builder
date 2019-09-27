console.log('Testing module: ./components/event_test - Event class');

const assert = require('assert');
const pcb = require('../../index');

const testScript1 = require('./script_test');
const testCode = "console.log('This is a test script logger');";

const prerequestCode = "console.log('This is a pre-request script');"
let event = new pcb.Event('test', testScript1);

// test constructor
assert( event.listen === 'test', "Property event.listen should be 'test");

// test method getScript
assert( event.getScript() === testScript1, "event.getScript should return 'testScript1' which was passed in as parameter");

// test method setScript
    // with text object
event.setScript(testCode);
assert( event.getScript().exec[0] === testCode, "event.getScript should return 'testCode' which replaced 'testScript1'");
    // with script object
event.setScript(testScript1);
    assert( event.getScript() === testScript1, "event.getScript should return 'testScript1' which replaced 'testCode'");


module.exports = event;
