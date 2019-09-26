const Script = require('./script');

/**
 * An event holds either test scripts or pre request scripts for children of Item- Folder and RequestItem objects.
 * 
 * One event holds one script. 
 * 
 * The Event object is stored in the postman collection json object in an array with the label 'event'
 * 
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
     * 
     * @member {string} listen
     * @member {Script} script
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
     * eg. event.getScript().addScriptCode("javascript..");
     *
     * @readonly
     * @returns {Script} the events Script object
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
module.exports = Event;
