/**
 * contains the url details for a Request object
 *
 * @class Url
 */
class Url {

    /**
     *Creates an instance of Url.
     * @param {string} urlString
     * @memberof Url
     */
    constructor(urlString) {
        let url = new URL(urlString);   // native URL object
        this.raw = urlString;
        this.protocol = url.protocol.replace(":", "");
        this.host = [ url.hostname ];
        this.port = url.port;
        this.path = url.pathname.split('/');
        if (this.path.length > 0 && this.path[0] === '') this.path.shift();
        if (this.path.length > 0 && this.path[this.path.length - 1] === '') this.path.pop();
    }
}
module.exports = Url;