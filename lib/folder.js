const Item = require('./item');
const RequestItem = require('./requestitem');

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
module.exports = Folder;
