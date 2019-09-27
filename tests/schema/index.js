const Ajv = require('ajv');

const pmschema = require('../../postman-collection-schema.json');
const basicGet = require('../../samples/output/basicGet.postman_collection.json');
const basicPost1 = require('../../samples/output/basicPost1.postman_collection.json');
const basicPost2 = require('../../samples/output/basicPost2.postman_collection.json');
const dbDesign = require('../../samples/output/dbdesign.postman_collection.json');
const fullexample = require('../../samples/output/fullexample.postman_collection.json');

let ajv = new Ajv({schemaId: 'id', logger: false});

ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'));

let validate = ajv.compile(pmschema);

console.log("\nTesting Sample Collections against postman collection json schema-");
console.log("     basicGet: " + validate(basicGet));
console.log("   basicPost1: " + validate(basicPost1));
console.log("   basicPost2: " + validate(basicPost2));
console.log("     dbDesign: " + validate(dbDesign));
console.log("  fullexample: " + validate(fullexample));