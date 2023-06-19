module.exports = class User {
    #token = "";

    constructor(token) {
        this.#token = token;
    }

    get token() {
        return this.#token;
    }

    getInfo = () => {
        return require("../functions/exported/user/get-info")(this);
    }
    getResources = () => {
        return require("../functions/exported/user/get-resources")(this);
    }
}