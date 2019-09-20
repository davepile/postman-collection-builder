const Item = require('./item');
const Request = require('./request');
const Url = require('./url');


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
module.exports = RequestItem;
