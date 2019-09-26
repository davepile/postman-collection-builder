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
     * Adds a folder to this folder
     *
     * @param {Folder | string} folder
     * @returns {Folder} returns this folder (not the added folder)
     * @memberof Folder
     */
    addFolder(folder){
        if (folder instanceof Folder){
            this.item.push(folder);
        } else if (typeof folder === typeof ''){
            this.item.push(new Folder(name));
        } else {
            throw("Parameter 'folder' must be an instance of Folder or a string");
        }
        return this;
    }

    /**
    * Creates a folder and adds it to the collection. Note returns the newly created folder, not the original folder.
    *
    * @param {string} foldername
    * @returns {Folder} returns the newly created folder (not the parent folder)
    * @memberof Collection
    */
    createFolder(foldername){
        if (typeof foldername === typeof '') {
            let f = new Folder(foldername);
            this.addFolder(f);
            return f;
        } else {
            throw ('Param foldername must be a string');
        }
    }

    /**
     * Adds a RequestItem to the folder
     * @returns {RequestItem} returns the request item passed in as parameter
     * @param {RequestItem} requestitem
     * @returns {Folder} returns this folder
     * @memberof Folder
     */
    addRequestItem(requestitem){
        if (requestitem instanceof RequestItem){
            this.item.push(requestitem);
        } else {
            throw('Param requestitem must be an instance of RequestItem');
        }
        return this;
    }

}
module.exports = Folder;
