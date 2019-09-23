// basicPost1 creates a postman collection that contains a single POST request to the postman test site.
// Its a little more complicated than the previous Get request because we will POST a json
// body and will therefore need to create the content-type header. We will also need to manually
// specify the Request details and also we will add a couple of tests.

    // Replace this line with the one below it when you install postman-collection-builder
const pcb = require('../index');
    // const pcb = require('postman-collection-builder');
const saveCollection = require('./savecollection');
const outputFolder = './output';

let collection = new pcb.Collection('basicPost1');

    // Our RequestItem requires a name and a Request object. The Request object requires some set up

let header = new pcb.Header('Content-type', 'application/json');
let headers = new pcb.Headers([header]);

    // the body is a simple of json object so mode is 'raw'
let body = new pcb.Body('raw', '{ "name": "Fred" }');

    // Request object is the request details for RequestItem
let request = new pcb.Request('https://postman-echo.com/post','POST', headers, body);

    // create RequestItem using Request
let requestItem = new pcb.RequestItem('basicPost1', request);

    // add the same test we used in collection basicGet
requestItem.addTest(
`   pm.test("Status code is 200", function () {
        pm.response.to.have.status(200);
    });
`);

    // add another test that checks the reponse body (json) includes our original body
requestItem.addTest(
`   pm.test("Response data contains POSTed body", function () {
        let jsonData = pm.response.json();
        pm.expect(jsonData.json.name).to.eql("Fred");
    });
`);

    // add the RequestItem we just created to the collection object.
collection.addRequestItem(requestItem);

    // Thats it. Your postman collection can be saved to a file and imported into postman
    // or run using postman's newman command line runner or using the newman api

    // check the output folder. The collection will be saved with the name it was given
saveCollection(collection);



