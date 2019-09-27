const pcb = require('../index');
const saveCollection = require('./savecollection');
const outputFolder = './output';
const prereqLib = require('./fullexample-prereqscripts');
const testLib = require('./fullexample-tests');


let collection = new pcb.Collection('fullexample');

collection.addPreRequest(
    prereqLib.collection
)
.addFolder(                                     // addFolder returns a reference to collection
    new pcb.Folder("GetAllTables")
    .addRequestItem(
        new pcb.RequestItem(
            'AllTablesFromData',
            new pcb.Request('http://localhost:9000/tables/{{path}}')
        )
        .addTest(testLib.AllTablesFromData)
    )
    .addTest(
        testLib.folderGetAllTables
    )
)
.createFolder('InsertProject'                   // createFolder returns a reference to the new folder
    )
    .addRequestItem(
        new pcb.RequestItem(
            'projectInsert',
            new pcb.Request(
                'http://localhost:9000/tables/projects',
                'POST',
                new pcb.Headers( new pcb.Header('content-type', 'application/json')),
                new pcb.Body(
                    'raw',
                    `{
                        "name": "{{name}}",
                        "status": "{{status}}",
                        "description": "{{description}}"
                    }`
                )
            )
        )
        .addTest(testLib.projectInsert)
    );





saveCollection(collection);