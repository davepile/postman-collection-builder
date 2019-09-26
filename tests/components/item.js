console.log('Testing module: ./components/item - Item class ');

const assert = require('assert');
const pcb = require('../../index');

const script = require('./script');
const event = require('./event');

let name1 = "ItemOne";
let item = new pcb.Item(name1);
let prerequestCode = "console.log('this is a prerequest log script');";
let testCode = `pm.test("Response time is less than 200ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(200);
});`;

// Note that references to event[x] rely on the insertion order of elements

// Test constructor
assert( item.name === name1, "item.name must equal name");
assert( Array.isArray(item.event), "item.event should be an Array");
assert( item.event.length === 0, "item.event should be length of 0");

// Test addEvent
assert( item.addEvent(event) === item, "item.addEvent() should return a reference to item");
assert( item.event.length === 1, "item.event should be length 1");
assert( item.event[0] === event, "item.event[0] should be equal to event");
assert.throws( () => { item.addEvent('') });

// Test addScript
item = new pcb.Item(name1);  // reset
    // with a script object
assert( item.addScript('test', script) === item, "item.addScript() should return reference to item");
assert( item.event.length === 1, "item.event should be length of 1");
assert( item.event[0].listen = 'test', "event[0].listen should be equal to 'test'");
assert( item.event[0].script === script, "item.event[0].script should be equal to parameter script");
assert.throws( () => { item.addScript('invalid eventtype', script) } );
    // with a text script
assert( item.addScript('prerequest', prerequestCode) === item, "item.addScript() should return reference to item");
assert( item.event.length === 2, "item.event should be length of 2");
assert( item.event[1].listen = 'prerequest', "event[1].listen should be equal to 'prerequest'");
assert( item.event[1].script instanceof pcb.Script, "item.event[1].script should be an instance of Script");
assert( Array.isArray(item.event[1].script.exec), "item.event[1].script.exec must be an array");
assert( item.event[1].script.exec.length === 1, "item.event[1].script.exec must be lenth of 1");
assert( item.event[1].script.type === 'text/javascript', "item.event[1].script.type must be equal to 'text/javascript'");

//Test addTest
    //setup
scriptlength = item.event[0].script.exec.length;
assert( item.addTest(testCode) === item,  "item.addTest() must return a reference to item");
assert( item.event[0].script.exec.length > scriptlength, "item.event[0].script.exec.length should have increased after adding a test");
assert( item.event[0].listen === 'test', "item.event[0].listen shoud be equal to 'test");

// Test addPreRequest
scriptlength = item.event[1].script.exec.length;
assert( item.addPreRequest(prerequestCode) === item, "item.addPreRequest() must return a reference to item");
assert( item.event[1].script.exec.length > scriptlength, "item.event[1].script.exec.length should have increased after adding a prerequest");
assert( item.event[1].listen === 'prerequest', "item.event[1].listen shoud be equal to 'prerequest'");


// Multiple calls to addScript, addTest and addPreRequest should result in an event array no morethan 2 elements
assert( item.event.length <= 2, "item.event must never have length > 2");

// Test findEvent
assert( item.findEvent('test') === item.event[0], "item.findEvent('test') should return item.event[0]");
assert( item.findEvent('prerequest') === item.event[1], "item.findEvent('prerequest') should return item.event[1]");

