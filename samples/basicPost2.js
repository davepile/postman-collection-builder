// basicPost2 achieves the same result as basicPost1 but uses chaining

// Replace this line with the one below it when you install postman-collection-builder
const pcb = require('../index');

const saveCollection = require('./savecollection');
const outputFolder = './output';

// Start off by creating a collection with a name
let collection = new pcb.Collection('basicPost2');

// create a RequestItem object, which equates to a 'tab' in the postman app
// the request item
let requestItem = new pcb.RequestItem('PostMan-Echo',
                                        new pcb.Request(
                                            'https://postman-echo.com/post',
                                            'POST',
                                            new pcb.Headers(
                                                [
                                                    new pcb.Header('Content-type', 'application/json'),
                                                ]
                                            ),
                                            new pcb.Body('raw', '{ "name": "James" }'),
                                        ),
                                    ).addTest(
`   pm.test("Status code is 200", function () {
        pm.response.to.have.status(200);
    });
`).addTest(
`   pm.test("Response data contains POSTed body", function () {
        let jsonData = pm.response.json();
        pm.expect(jsonData.json.name).to.eql("James");
    });
`);

// add the RequestItem we just created to the collection object.
collection.addRequestItem(requestItem);

// Thats it. Your postman collection can be saved to a file and imported into postman
// or run using postman's newman command line runner or using the newman api

// check the output folder. The collection will be saved with the name it was given
saveCollection(collection);



