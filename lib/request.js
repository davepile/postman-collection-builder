const Url = require('./url');
const Headers = require('./headers');
const Body = require('./body');
const Header = require('./header');


/**
 * An object that holds the request details of the RequestItem
 *
 * @class Request
 */
class Request {

    /**
     * Creates an instance of Request. Request differs from RequestItem in that RequestItem is a tab or "Request" from postman
     * and Request class here simply holds request details for the RequestItem. It is necessary to do it this way as this module
     * needs to replicate the json schema used for postman collections.
     * 
     * @param {Url | string} url can be an instance of Url or a string url
     * @param {string} [method=GET] (optional) defaults to GET
     * @param {Headers} [headers] (optional) 
     * @param {Body} [body] - (optional)
     * @memberof Request
     */
    constructor(url, method, headers, body){
        this.setUrl(url);

        if (typeof method === typeof '') {
            this.method = method;
        } else {
            this.method = "GET";
        }

        if (headers instanceof Headers){
            this.header = headers.header; 
        } else if (!headers){
            this.header = []
        } else {
            throw ("Parameter 'headers' must be an instance of Headers or null/ undefined");
        }

        if (body instanceof Body) {
            this.body = body;
        } else if(body !== null && body !== undefined){
            throw ("Parameter 'body' must be an instance of Body or null/ undefined");
        }
        
    }

    /**
     * adds a Url object to the 
     *
     * @param {Url | string} url
     * @returns {Request} return this request
     * @memberof Request
     */
    setUrl(url) {
        if (url instanceof Url) {
            this.url = url;
        } else if (typeof url === typeof '' && url.trim() !== '') {
            this.url = new Url(url);
        } else {
            throw("Parameter 'url' must be an instance of Url or a string url");
        }
        return this;
    }

    /**
     * adds a header name value pair to te headers list
     *
     * @param {string | Header} header is either an instance of Header or the string name of teh header
     * @param {string} [value] value of the header, only required if header is a string name
     * @returns {Request} return this request
     * @memberof Request
     */
    addHeader(header, value){
        if (header instanceof Header){
            this.header.push(header);
        } else {
            // not testing. its not the end of the world if undefined is pushed as a value
            this.header.push(new Header(header, value));
        }
        return this;
    }

    /**
     * sets the headers for the Request with the supplied values. Existing header values are removed.
     *
     * @param {Headers} headers new Headers object
     * @returns {Request} return this request
     * @memberof Request
     */
    setHeaders(headers){
        if (headers instanceof Headers){
            this.header = headers.header;   // taking the guts out of param headers so both headers and this, use the same array
            return this;
        } else {
            throw("Parameter 'headers' must be an instance of Headers");
        }
    }

    /**
     * Sets the body of the request. Any existing body is replaced. 
     *
     * @param {Body} body
     * @returns {Request} returns this request
     * @memberof Request
     */
    setBody(body){
        if( body instanceof Body){
            this.body = body;
            return this;
        } else {
            throw("Paramater 'body' must be an instance of Body");
        }
    }
}
module.exports = Request;
