const Event = require('./event');
const Script = require('./script');
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