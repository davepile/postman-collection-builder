console.log('Testing module: ./components/script - Script class ');

const assert = require('assert');
const pcb = require('../../index');

let codetext1 = `   pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});
`;
let codetext2 = `   pm.test("Response data contains POSTed body", function () {
    let jsonData = pm.response.json();
    pm.expect(jsonData.json.name).to.eql("Fred");
});
`;

let script = new pcb.Script(codetext1);

assert( script.type === 'text/javascript', "Property script.type must be 'text/javascript'");
assert( NonEmptyLineCount(script.exec) === 3, 'Number of non blank code lines should be 3');

script.addScriptCode(codetext2);
assert( NonEmptyLineCount(script.exec) === 7, 'Number of non blank code lines should be 7');


function NonEmptyLineCount(stringArr){
    let linecount = 0;
    stringArr.forEach(s => {
        if (s.trim() !== '') linecount++;
    });
    return linecount;
}

module.exports = script;
