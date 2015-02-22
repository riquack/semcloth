var DEFAULT_SERVER_URL = "http://clevo-laptop";
var DEFULT_SERVER_PORT = "9000";
var DEFAULT_SERVER = DEFAULT_SERVER_URL + ":" + DEFULT_SERVER_PORT;

function constructURL(path) {
    return DEFAULT_SERVER + path;
}