const Header = require('./header');

/**
 * contains an array of header name value pairs
 * @class Headers
 */
class Headers {
    /** 
     *Creates an instance of Headers.
     * @param {Array.<Header>} [headers] - (optional) an array of objects in the form {name: "", value: ""}
     * @memberof Headers
     */
    constructor(headers){
        if (Array.isArray(headers)){
            this.setHeaders(headers);
        } else {
            this.headers = [];
        }
    }

    /**
     * Replaces all headers with the array of Header objects supplied in param headers
     *
     * @param {Array.<Header>} headers and array of Header objects
     * @memberof Headers
     */
    setHeaders(headers){
        if (Array.isArray(headers)) {
            headers.forEach(v => {
                if (!v instanceof Headers) throw ("Param 'headers', if supplied, must be an array of Header instances");
            });
            this.headers = headers;
        } else {
            throw ("Param 'headers', if supplied, must be an array of Header instances");
        }
    }

    /**
     * Adds a name value pair to the headers array
     *
     * @param {*} name
     * @param {*} value
     * @memberof Headers
     */
    addHeader(name, value){
        this.headers.push(new Header(key, value));
    }
}
module.exports.Headers = Headers;