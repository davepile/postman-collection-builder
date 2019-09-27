module.exports.collection = 
`let req = {
    url: '',
    method: 'GET',
    header: 'Content-Type:application/json',
    body: {}
};

let stype = [
    "One",
    "Many",
];
let tablelist = [
    "projects",
    "projectversions",
    "mdbs",
    "mschemas",
    "mtables",
    "mcols",
];    
pm.globals.set("tablelist", tablelist);

stype.forEach( type => {
    tablelist.forEach( tblname => {
        req.url = 'http://localhost:9000/tables/schema/' + tblname + 'Get' + type + '.json',
        pm.sendRequest(req, 
            function (err, res) {
                if (res !== null) {
                    if (res.status === "OK"){
                        let json = res.json();
                        pm.globals.set(tblname + 'Get' + type, json);
                    } else {
                        console.log("Error returned from call: " + req.url);
                        console.log("HTTP Status: " + res.status);
                        console.log("HTTP status code: " + res.code);
                    }
                } else {
                    console.log("NULL response returned from call: " + req.url);
                }
            }
        );    
    });
});
`;

