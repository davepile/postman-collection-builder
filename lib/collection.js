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
        this.item = [];
        this.event = [];
    }

    /**
     * Adds an Item to the collection. You should generally use addRequestItem and addFolder
     * @param {Item} item 
     * @return {Item}   - returns the same item that was passed in as a parameter
     * @memberof Collection
     */
    addItem(item) {
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
    addFolder(folder) {
        if (folder instanceof Folder) {
            return this.addItem(folder);
        } else if (typeof folder === typeof '') {
            return this.addItem(new Folder(folder));
        } else {
            throw ("param 'folder' must be an instance of Folder or a string");
        }
    }

    /**
     * Adds a RequestItem to the collection
     * @param {RequesItem} requestitem must be an instance of RequestItem
     * @return {RequestItem} returns the RequestItem that was passed in as a parameter
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

module.exports = Collection;