const uuidv1 = require('uuid/v1');

const Item = require('./item');
const Folder = require('./folder');
const RequestItem = require('./requestitem');
const Event = require('./event');

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
        this.item = [];     // can be a Folder or RequestItem object
        this.event = [];
    }

    /**
     * Adds an Item to the collection. You should generally use addRequestItem and addFolder
     * @param {Item} item object of Folder or RequestItem which are derived from Item 
     * @returns {Collection} - returns this collection
     * @memberof Collection
     */
    addItem(item) {
        if (item instanceof Item){
            this.item.push(item);
            return this;
        } else {
            throw ("Param 'item' must be an instance of Item");
        }
    }

    /**
     * Adds a folder to the collection
     * @param {Folder | string} folder must be an instance of Folder or a string name for the folder
     * @returns {Collection} - returns this collection
     * @memberof Collection
     */
    addFolder(folder) {
        if (folder instanceof Folder) {
            return this.addItem(folder);
        } else {
            throw ("param 'folder' must be an instance of Folder or a string");
        }
    }

    /**
     * Creates a folder and adds it to the collection. Note returns the newly created folder, not the collection.
     *
     * @param {string} foldername
     * @returns {Folder} - newly created folder
     * @memberof Collection
     */
    createFolder(foldername){
        if (typeof foldername === typeof ''){
            let f = new Folder(foldername);
            this.addItem(f);
            return f;
        } else {
            throw('Param foldername must be a string');
        }
    
    }

    /**
     * Adds a RequestItem to the collection
     * @param {RequesItem} requestitem must be an instance of RequestItem
     * @returns {Collection} - returns this collection
     * @memberof Collection
     */
    addRequestItem(requestitem) {
        if (requestitem instanceof RequestItem) {
            return this.addItem(requestitem);
        } else {
            throw ("param 'requestitem' must be an instrance of RequestItem");
        }
    }

    /**
     *
     *
     * @param {string} name
     * @param {Request} request
     * @returns {RequestItem} the newly created Request object
     * @memberof Collection
     */
    createRequestItem(name, request){
        if(typeof name === typeof '' && request instanceof Request){
            let ri = new RequestItem(name, request);
            this.addItem(ri);
            return ri;
        } else {
            throw("Param 'name' must be a string and param 'rqeuest' must be an instance of Request");
        }
    }

    /**
     * Adds an event to Item. Use this if you have already created the Event and want to add it,
     * otherwise use addTest and addScript whic create the event for you
     *
     * @param {Event} event
     * @returns {Collection} - returns this collection
     * @memberof Item
     */
    addEvent(event) {
        if (event instanceof Event) {
            this.event.push(event);
            return this;
        } else {
            throw ("param 'event' must be an instrance of Event");
        }
    }

    // not sure there is a need for createScript and the primary purpose of the createXxx methods is to 
    // get have the created object returned for chaining

    /**
     * Adds a test script to the Item, Folder or RequestItem
     *
     * @param {Script | string} script can be a Script object or a string containing javascript
     * @returns {Collection} returns this collection
     * @memberof Item
     */
    addTest(script) {
        return this.addEvent(new Event('test', script));
    }

    /**
     * Adds a pre request script to the Iten, Folder or RequestItem
     *
     * @param {Script | string} script can be a Script object or a string containing javascript
     * @returns {Collection} - returns this collection
     * @memberof Item
     */
    addPreRequest(script) {
        let e = new Event('prerequest', script);
        return this.addEvent(e);
    }

}

module.exports = Collection;