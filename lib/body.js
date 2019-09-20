const FormData = require('./formdata');

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
module.exports = Body;
