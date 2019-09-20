const uuidv1 = require('uuid/v1');


module.exports.fileExtension = 'postman_collection.json';

/***
 * @class Collection Represents an entire Postman Collection
 * 
 */
class Collection {
    /**
     *Creates an instance of Collection.
     * @param {string} name - Name of the collection
     */
    constructor(name) {
        this.info = {};
        this.info._postman_id = uuidv1();
        this.info.name = name;
        this.info.schema = "https://schema.getpostman.com/json/collection/v2.1.0/collection.json";
        this.item = [];
        this.event = [];
    }
    
    /**
     * Adds an Item to the collection. You should generally use addRequestItem and addFolder
     * @param {Item} item 
     * @return {Item}   - returns the same item that was passed in as a parameter
     * @memberof Collection
     */
    addItem(item){
        if (!(item instanceof Item)) throw ("param 'item' must be an instrance of Item");
        
        this.item.push(item);
        return item; 
    }

    /**
     * Adds a folder to the collection
     * @param {Folder | string} folder must be an instance of Folder or a string name for the folder
     * @return {Folder} returns the Folder that was passed in as a parameter
     * @memberof Collection
     */
    addFolder(folder){
        if (folder instanceof Folder) {
            return this.addItem(folder);
        } else if (typeof folder === typeof ''){
            return this.addItem(new Folder(folder));
        } else {
            throw("param 'folder' must be an instance of Folder or a string");
        }
    }
    
    /**
     * Adds a RequestItem to the collection
     * @param {RequesItem} requestitem must be an instance of RequestItem
     * @return {RequestItem} returns the RequestItem that was passed in as a parameter
     * @memberof Collection
     */
    addRequestItem(requestitem){
        if (requestitem instanceof RequestItem){
            return this.addItem(requestitem);
        } else {
            throw ("param 'requestitem' must be an instrance of RequestItem");
        }
    }

    /**
     * Adds an event to Item. Use this if you have already created the Event and want to add it,
     * otherwise use addTest and addScript whic create the event for you
     *
     * @param {Event} event
     * @memberof Item
     */
    addEvent(event) {
        if (event instanceof Event) {
            this.event.push(event);
        } else {
            throw ("param 'event' must be an instrance of Event");
        }
    }

    /**
     * Adds a test script to the Item, Folder or RequestItem
     *
     * @param {Script | string} script can be a Script object or a string containing javascript
     * @memberof Item
     */
    addTestScript(script) {
        this.addEvent(new Event('test', script));
    }

    /**
     * Adds a pre request script to the Iten, Folder or RequestItem
     *
     * @param {Script | string} script can be a Script object or a string containing javascript
     * @memberof Item
     */
    addPreRequestScript(script) {
        let e = new Event('prerequest', script);
        this.addEvent(e);
    }
}
module.exports.Collection = Collection;

/**
 * Item is a base class for Folder and RequestItem. It contains the functionality that is common 
 * to both of the derived classes- the ability to hold Events (test scripts and prerequest scripts)
 * 
 * @class Item
 */
class Item {
    constructor(name) {
        this.name = name;
        this.event = [];
    }

    /**
     * Adds an event to Item. Use this if you have already created the Event and want to add it,
     * otherwise use addTest and addScript whic create the event for you
     *
     * @param {Event} event
     * @memberof Item
     */
    addEvent(event) {
        if (event instanceof Event) {
            this.event.push(event);
        } else {
            throw ("param 'event' must be an instrance of Event");
        }
    }

    /**
     * Adds a test script to the Item, Folder or RequestItem
     *
     * @param {Script | string} script can be a Script object or a string containing javascript
     * @memberof Item
     */
    addTest(script) {
        let e = new Event('test', script);
        this.addEvent(e);
    }

    /**
     * Adds a pre request script to the Iten, Folder or RequestItem
     *
     * @param {Script | string} script can be a Script object or a string containing javascript
     * @memberof Item
     */
    addPreRequestScript(script) {
        let e = new Event('prerequest', script);
        this.addEvent(e);
    }
}
module.exports.Item = Item;

/**
 * Derived from Item, represents a postman folder. Can contain other folders, request item and events
 * which in turn contain test scripts and pre request scripts
 *
 * @class Folder
 * @extends {Item}
 */
class Folder extends Item {     // a type of item ItemGroup

    /**
     *Creates an instance of Folder.
     * 
     * @param {string} name
     * @memberof Folder
     */
    constructor(name) {
        super(name);
        this.item = [];
    }

    /**
     * Adds an Item to this Item. This is for internal use. You should use addFoder and addRequestItem
     *
     * @param {Item} item
     * @memberof Folder
     */
    addItem(item){
        if (item instanceof Item) {
            this.item.push(item);
        } else {
            throw("Parameter 'item' must be an instance of Item");
        }
    }

    /**
     * Adds a folder to this folder
     *
     * @param {Folder | string} folder
     * @memberof Folder
     */
    addFolder(folder){
        if (folder instanceof Folder){
            this.addItem(folder);
        } else if (typeof folder === typeof ''){
            this.addItem(new Folder(name));
        } else {
            throw("Parameter 'folder' must be an instance of Folder or a string");
        }
    }

    /**
     * Adds a RequestItem to the folder
     * @returns {RequestItem} returns the request item passed in as parameter
     * @param {RequestItem} requestitem
     * @memberof Folder
     */
    addRequestItem(requestitem){
        if (requestitem instanceof RequestItem){
            return this.addItem(requestitem);
        }
    }

}
module.exports.Folder = Folder;

/**
 * RequestItem corresponds with a tab in postman app
 *
 * @class RequestItem
 * @extends {Item}
 */
class RequestItem extends Item{   
    
    /**
     *Creates an instance of RequestItem.
     * @param {string} name a name for the RequestItem
     * @param {Request | Url | string} request can be a Request object, a Url object or a string url
     * @memberof RequestItem
     */
    constructor(name, request){
        super(name);
        this.setRequest(request);
        this.response = [];
    }
    
    /**
     * sets the Request object of the RequestItem. A RequestItem has one Request object which holds the
     * details of teh request such as Url, body etc.
     *
     * @param {Request | Url | string} request can be a Request object, a Url object or a string url
     * @memberof RequestItem
     */
    setRequest(request){
        if (request instanceof Request){
            this.request = request;
        } else if (request instanceof Url || typeof request === typeof ""){
            this.request = new Request(request)
        } else {
            // try having it empty as we may want to add complex Request after RequestItem is created
            this.request = {};
            // or
            // throw("Parameter 'request' must be an instance of Request, an instacnce of Url or a string url");
        }
        
    }
}
module.exports.RequestItem = RequestItem;

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
     * @param {Headers} [headers=[]] (optional) 
     * @param {Body} [body] - (optional)
     * @memberof Request
     */
    constructor(url, method, headers, body){
        if (typeof method === typeof "") {
            this.method = method;
        } else {
            this.method = "GET";
        }

        if (headers instanceof Headers){
            this.header = headers.headers; 
        } else if (!headers){
            this.header = []
        } else {
            throw ("Parameter 'headers' must be an instance of Headers or null/ undefined");
        }

        if (body instanceof Body) {
            this.body = body;
        } else if(body){
            throw ("Parameter 'body' must be an instance of Body or null/ undefined");
        }
        this.setUrl(url);
    }

    /**
     * adds a Url object to the 
     *
     * @param {Url | string} url
     * @memberof Request
     */
    setUrl(url) {
        if (url instanceof Url) {
            this.url = url;
        } else if (typeof url === typeof "" && url.trim() !== "") {
            this.url = new Url(url);
        } else {
            throw("Parameter 'url' must be an instance of Url or a string url");
        }
    }

    /**
     * adds a header name value pair to te headers list
     *
     * @param {string} name
     * @param {string} value
     * @memberof Request
     */
    addHeader(name, value){
        this.header.push(new Header(name, value));
    }

    /**
     * sets the headers for the Request with the supplied values. Existing header values are removed.
     *
     * @param {Headers} headers new Headers object
     * @memberof Request
     */
    setHeaders(headers){
        if (headers instanceof Headers){
            this.header = headers.headers;   // taking the guts out of param headers so both headers and this, use the same array
        } else {
            throw("Parameter 'headers' must be an instance of Headers");
        }
    }
}
module.exports.Request = Request;

/**
 * A single name value pair for an http header
 *
 * @class Header
 */
class Header {
    
    /**
     *Creates an instance of Header.
     * @param {string} name - name of the header
     * @param {string} value - value of the header
     * @memberof Header
     */
    constructor(name, value){
        this.key = name;
        this.name = name;
        this.value = value;
        this.type = 'text';
    }
}
module.exports.Header = Header;

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

/**
 * Body belongs to the Request class.
 * Currently handles only raw mode (data types) which is used for xml/ json
 * Will need to add url-coded form data etc
 *
 * @class Body
 */
class Body {

    /**
     *Creates an instance of Body.
     * @param {string} mode - values (discovered to date are 'raw', 'formdata')
     * @param {string | FormData} data - string containing raw json/xml/text etc. or FormData (FormData not yet implemented as a class)
     * @memberof Body
     */
    constructor(mode, data){
        this.mode = mode;
        if (mode === 'raw'){
            this.raw = data;
        } else if( mode === 'formdata'){
            if (data instanceof FormData) {
                this.formdata = data;
            } else {
                throw("Parameter 'data' must be an instance of FormData when parameter 'mode' is 'formdata'");
            }
        } else {
            throw ("Parameter 'mode' has an unsupported value of '" + mode + "'");
        }
    }
}
module.exports.Body = Body;

/**
 * contains the url details for a Request object
 *
 * @class Url
 */
class Url {

    /**
     *Creates an instance of Url.
     * @param {string} urlString
     * @memberof Url
     */
    constructor(urlString) {
        let url = new URL(urlString);
        this.raw = urlString;
        this.protocol = url.protocol.replace(":", "");
        this.host = [ url.hostname ];
        this.port = url.port;
        this.path = url.pathname.split(',');
    }
}
module.exports.Url = Url;

/**
 * Holds the javascript for an Event
 * Miht need to add ability to add js after the end of existing code
 *
 * @class Script
 */
class Script{
    
    /**
     *Creates an instance of Script.
     * @param {string} scripttext a string containing the javascript code or function
     * @param {string} [scripttype=text/javascript] (optional)
     * @memberof Script
     * 
     * @member {uuid} id
     * @member {Array.<string>} exec
     * @member {string} type will be 'text/javascript'
     */
    constructor(codetext){
        if (typeof codetext === typeof ''){
            this.id = uuidv1();
            this.setScriptCode(codetext)
            this.type = 'text/javascript';
        } else {
            throw("Parameter 'codetext' must be a string containing javascript");
        }
    }

    /**
     * Sets the executable code in the Script object, relacing any existing js code.
     *
     * @param {string} codetext
     * @memberof Script
     */
    setScriptCode(codetext){
        this.exec = codetext.split('\n');
    }

    /**
     * Adds javascript code to the end of the existing js code
     *
     * @param {string} codetext
     * @memberof Script
     */
    addScriptCode(codetext){
        let newscript = codetext.split('\n');
        if (this.exec.length > 0) this.exec.push("");
        this.exec.push(...newscript);
    }


}
module.exports.Script = Script;

/**
 * An event holds either test scripts or pre request scripts for children of Item- Folder and RequestItem objects.
 * 
 * One event holds one script. 
 * It can be created directly and added to a RequestItem or it can be  implicitly created by using the 
 * addTest and addPreRequest methods of Item or its descendants Folder and RequestItem
 *
 * @class Event
 */
class Event {

    /**
     *Creates an instance of Event.
     * @param {string} eventtype must be one of 'test' or 'prerequest'
     * @param {Script | string} script must be either an instance of Script or a string containing javascript
     * @memberof Event
     */
    constructor(eventtype, script){
        if (eventtype === 'test' || eventtype === 'prerequest'){
            this.listen = eventtype;
            this.setScript(script);
            
        } else {
            throw ("Parameter 'eventtype' must be one of ['test','prerequest']");
        }
         
    }

    /**
     * gets the events Script object. Use the returned value to change/ add code text
     *
     * @readonly
     * @memberof Event
     */
    getScript() {
        return this.script;
    }

    /**
     * Sets the executable code in the Script object, replacing any existing Script object
     *
     * @param {Script | string} script If script is a string, it is assumed to be code and a new Sript object is created from it
     * @memberof Event
     */
    setScript(script){
        if (script instanceof Script){
            this.script = script;
        } else {
            this.script = new Script(script); // will throw on a invalid input
        }
    }
}
module.exports.Event = Event;

