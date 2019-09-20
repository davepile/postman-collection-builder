/**
 * A single name value pair for an http header
 *
 * @class Header
 */
class Header {
    
    /**
     *Creates an instance of Header.
     * @param {string} name - name of the header
     * @param {string} value - value of the header
     * @memberof Header
     */
    constructor(name, value){
        this.key = name;
        this.name = name;
        this.value = value;
        this.type = 'text';
    }
}
module.exports = Header;