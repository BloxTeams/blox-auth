const assert = require("../functions/internal/assert");

module.exports = class Client {
    constructor(options) {
        this.options = {};
        
        const optionsType = typeof options;
        assert(optionsType == "object", `Syntax error: object expected for "options", received ${optionsType}`);

        for (const [key, value] of Object.entries(options)) {
            this.options[key] = value;
        }
    }

    config() {
        const bloxAuth = require("../blox-auth");
        
        bloxAuth.config = this.options;
    }
}