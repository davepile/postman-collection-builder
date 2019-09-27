module.exports.folderGetAllTables =
`pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("DataPacket.Response is true", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.response).to.eql(true);
});

pm.test("Response time is less than 10ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(200);
});

pm.test("Content-Type is 'application/json; charset=UTF-8'", function () {
    pm.response.to.have.header("Content-Type", "application/json; charset=UTF-8");
});`;

module.exports.AllTablesFromData = 
`let schemaname = pm.iterationData.get("schemaname");

let schema = pm.globals.get(schemaname);

pm.test('Schema is valid', function() {
    pm.response.to.have.jsonSchema(schema)
    
});`;

module.exports.projectInsert = 
`pm.test("Response time is less than 200ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(200);
});

pm.test("Successful POST request", function () {
    pm.expect(pm.response.code).to.be.oneOf([200, 201,202]);
});`;