// Just a utility to save a file

const fs = require('fs');

// Replace this line with the one below it when you install postman-collection-builder
const pmcb = require('../index');
// const pmcb = require('postman-collection-builder');



module.exports = function(collection){
    if (collection instanceof pmcb.Collection){
        let jsonCollection = JSON.stringify(collection, null, 2);
        let filename = './output/' + collection.info.name + '.' + pmcb.fileExtension;

        fs.writeFile(filename, jsonCollection, function (err) {
            if (err) {
                console.log("ERROR saving collection '" + collection.info.name + "' to file '" + filename + "'");
                console.log(err);
            } else {
                console.log("Collection '" + collection.info.name + "' saved to file '" + filename + "'");
            }
        });
        return jsonCollection;
    } else {
        throw ("Parameter 'collection' passed to saveCollection() must be an instance of Collection");
    }
}