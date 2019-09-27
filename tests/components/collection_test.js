console.log('Testing module: ./components/collection_test - Collection class ');

const assert = require('assert');
const pcb = require('../../index');
const item = require('./item_test');
const folder = require('./folder_test');
const requestitem = require('./requestitem_test');
const request = require('./request_test');

let name = "testCollection";
let schema = "https://schema.getpostman.com/json/collection/v2.1.0/collection.json";
let foldername = "folderTwo";
let requestitemname = "New RequestItem";

// Test constructor
let collection = new pcb.Collection(name);
assert( typeof collection.info === 'object', "collection.info mst be an object");
assert( typeof collection.info._postman_id === typeof '', "collection.info._postman_id must be a string");
assert( collection.info.name === name, "collecion.info.name must equal name");
assert( collection.info.schema === schema, "collecion.info.schema must equal schema");
assert( Array.isArray(collection.item), "collection.item must be an array");
assert( collection.item.length === 0, "collection.item should be length 0");
assert( Array.isArray(collection.event), "collection.event must be an array");
assert( collection.event.length === 0, "collection.event should be length 0");
assert.throws( () => { new collection() }, "Collection constructor must be passed a 'name' parameter");

// Test addItem
assert( collection.addItem(item) === collection, "collecion.addItem must return a reference to collection");
assert( collection.item.length === 1, "collection.item.length should equal 1");
assert( collection.item[0] === item, "collection.item[0] should equal item");
assert.throws( () => { collection.addItem('a string') } );

// test addFolder
collection = new pcb.Collection(name);
assert( collection.addFolder(folder) === collection, "collecion.addFolder must return a reference to collection");
assert( collection.item.length === 1, "collection.item.length should equal 1");
assert( collection.item[0] === folder, "collection.item[0] should equal folder");
assert.throws( () => { collection.addFolder('a string') } );

// test createFolder
let newfolder = collection.createFolder(foldername);
assert( newfolder instanceof pcb.Folder, "collecion.createFolder must return a reference to a Folder");
// this test ^ wll not detect the wrong folder being returned
assert( collection.item.length === 2, "collection.item.length should be 2");
assert( collection.item[ collection.item.length - 1] instanceof pcb.Folder, "Last item in colelction.item should be type Folder");
assert( collection.item[ collection.item.length - 1].name === foldername, "Last item in colelction.item should ave name '" + foldername + "'");
assert( collection.item[ collection.item.length - 1] === newfolder, "Last item in collection.item[] should be the newly created folder");
assert.throws( () => { collection.createFolder() } );

// Test addRequestItem
let itemlength = collection.item.length + 1;
assert( collection.addRequestItem(requestitem) === collection, "collecion.addRequestItem must return a reference to collection");
assert( collection.item.length === itemlength, "collection.item.length should equal " + itemlength);
assert( collection.item[ collection.item.length - 1 ] === requestitem, "Last collection.item should equal requestitem");
assert.throws( () => { collection.addRequestItem('a string') } );

// test createRequestItem
itemlength = collection.item.length + 1;
let newrequestitem = collection.createRequestItem(requestitemname, request);
assert( newrequestitem instanceof pcb.RequestItem, "collecion.createRequestItem must return a reference to a RequestItem");
// this test ^ wll not detect the wrong RequestItem being returned
assert( collection.item.length === itemlength, "collection.item.length should be " + itemlength);
assert( collection.item[ collection.item.length - 1] instanceof pcb.RequestItem, "Last item in colelction.item should be type RequestItem");
assert( collection.item[ collection.item.length - 1].name === requestitemname, "Last item in colelction.item should ave name '" + requestitemname + "'");
assert( collection.item[ collection.item.length - 1] === newrequestitem, "Last item in collection.item[] should be the newly created RequestItem");
assert.throws( () => { collection.createRequestItem(name, 'not an instance of Request') } );