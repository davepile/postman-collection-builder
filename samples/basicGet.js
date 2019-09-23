// basicGet creates a postman collection that contains a single Get request

    // Replace this line with the one below it when you install postman-collection-builder
const pcb = require('../index');
    // const pcb = require('postman-collection-builder');

    // Just a helper function for these samples
const saveCollection = require('./savecollection');

const outputFolder = './output';

    // Start off by creating a collection with a name
let collection = new pcb.Collection('basicGet');

    // create a RequestItem object, which equates to a 'tab' in the postman app
    // In this case we are only adding a simple Get request, so we can just pass the 
    // url string in as the second parameter. Other options for the second parameter 
    // are discussed when dealing with more complex requests
let requestItem = new pcb.RequestItem('PostMan-Echo', 'https://postman-echo.com/get');

    // add a test script to the RequestItem.
    // Alternately, as in the postman app, we could add a test to the collection iteself.
    // We will do this later.
requestItem.addTest(
`   pm.test("Status code is 200", function () {
        pm.response.to.have.status(200);
    });
`);

    // add the RequestItem we just created to the collection object.
collection.addRequestItem(requestItem);

    // Thats it. Your postman collection can be saved to a file and imported into postman
    // or run using postman's newman command line runner or using the newman api

    // check the output folder. The collection will be saved with the name it was given
saveCollection(collection);



