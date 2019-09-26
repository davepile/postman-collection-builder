const Event = require('./event');


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
     * Considered removing as it probably wont be used
     * @param {Event} event
     * @returns {Item} returns this item
     * @memberof Item
     */
    addEvent(event) {
        if (event instanceof Event) {
            this.event.push(event);
        } else {
            throw ("Parameter 'event' must be an instance of Event");
        }
        return this;
    }

    /**
     * adds a script to the Item. Note that regardless of whether you pass in a Script object or 
     * pass in the script as text, the script code is copied, so modifying the Script after you
     * pass it in will not affect the Item's script code.
     *
     * @param {string} eventtype - must be either 'test' or 'prerequest'
     * @param {string | Script} script - Either a script bject containing a script code or a string 
     * @returns {Item} returns this Item
     * @memberof Item
     */
    addScript(eventtype, script) {
        if (eventtype !== 'test' && eventtype !== 'prerequest') {
            throw ("Param 'eventtype' must be either 'test' or 'prerequest'");
        }
        let e = this.findEvent(eventtype);
        if (!e) {
            e = new Event(eventtype, script);      // Event constructor handles whether 'script' is a Script object or string
            this.event.push(e);
        } else {
            let currentscript = e.getScript();
            if (typeof script === typeof '') {
                currentscript.addScriptCode(script);
            } else {
                currentscript.addScriptCode(script.getScriptCode());
            }
        }
        return this;
    }

    /**
     * Adds a test script to the Item, Folder or RequestItem
     * There is no createTest(). If you need a ref to the test, create it first with new Event() or new Script() 
     * @param {Script | string} script can be a Script object or a string containing javascript
     * @returns {Item} returns this item
     * @memberof Item
     */
    addTest(script) {
        return this.addScript('test',script)
    }

    /**
     * Adds a pre request script to the Iten, Folder or RequestItem
     *
     * @param {Script | string} script can be a Script object or a string containing javascript
     * @returns {Item} returns this item
     * @memberof Item
     */
    addPreRequest(script) {
        return this.addScript('prerequest', script);
    }

        /***
     * finds the event of eventtype
     * @param {string} eventtype - must be either 'test' or 'prerequest'
     * @returns {Event} returns the found event or undefined
     * @memberof Item
     */
    findEvent(eventtype){
        if (eventtype === 'test' || eventtype === 'prerequest') {
            return this.event.find(e => {
                                            return (e.listen === eventtype);
                                        });            
        } else {
            throw ("Parameter 'eventtype' must be one of ['test','prerequest']");
        }
    }
}
module.exports = Item;