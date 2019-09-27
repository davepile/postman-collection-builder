// requiring tests each component
const header = require('./components/header_test');
const headers = require('./components/headers_test');
const body = require('./components/body_test');
const url = require('./components/url_test');
const script = require('./components/script_test');
const event = require('./components/event_test');
const request = require('./components/request_test');
const item = require('./components/item_test');
const requestitem = require('./components/requestitem_test');
const folder = require('./components/folder_test');
const collection = require('./components/collection_test');

// tests the collections in the samples against the postman collection json schema 
// uses ajv. will need to install dev dependancies

const schematest = require('./schema');
