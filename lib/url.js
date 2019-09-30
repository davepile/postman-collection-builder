/**
 * contains the url details for a Request object
 *
 * @class Url
 */
class Url {

    /**
     *Creates an instance of Url.
     * @param {string} urlString
     * @param {boolean} [uriEncodePmParams=false] default false means '{{' and '}}' will be preserved in the path and not uri encoded. Set to true if you want them uriEncoded
     * @memberof Url
     */
    constructor(urlString, uriEncodePmParams) {
        let url = new URL(urlString);   // native URL object
        this.raw = urlString;
        this.protocol = url.protocol.replace(":", "");
        this.host = [ url.hostname ];
        this.port = url.port;
        this.path = url.pathname.split('/');
        if (this.path.length > 0 && this.path[0] === '') this.path.shift();
        if (this.path.length > 0 && this.path[this.path.length - 1] === '') this.path.pop();
        if (uriEncodePmParams !== true){
            this.path = this.path.map( 
                e => e.replace('%7B%7B', '{{').replace('%7D%7D', '}}')
            )
        }
    }
}
module.exports = Url;