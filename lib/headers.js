const Header = require('./header');

/**
 * contains an array of header name value pairs
 * Note that this class does not translate to any object in the postman json schema
 * when it is used in Request.setHeaders only the internal header array.
 * is copied across
 * @class Headers
 */
class Headers {
    /** 
     *Creates an instance of Headers.
     * @param {Header[]} [header] - (optional) an array of Header objects
     * @memberof Headers
     * 
     * @member header
     */
    constructor(headers){
        if (Array.isArray(headers)){
            this.setHeaders(headers);
        } else {
            this.header = [];
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
            this.header = headers;
        } else {
            throw ("Param 'headers', if supplied, must be an array of Header instances");
        }
    }

    /**
     * Adds a name value pair to the headers array
     *
     * @param {string | Header} header - an instace of Header or the string name of the header
     * @param {string} [value] - not required if header is an instance of Header, otherwise the value of the header if paran 'header' is a string
     * @returns {Headers} returns this Headers
     * @memberof Headers
     */
    addHeader(header, value){
        if (header instanceof Header){
            this.header.push(header);
        } else {
            this.header.push(new Header(header, value));
        }
        return this;
    }
}
module.exports = Headers;