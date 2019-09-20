const uuidv1 = require('uuid/v1');

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
module.exports = Script;
