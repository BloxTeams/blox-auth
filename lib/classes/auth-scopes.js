module.exports = class AuthorizationScopes {
    constructor(scopes) {
        if (!Array.isArray(scopes)) {
            throw new Error(`Syntax error: array expected for "scopes", received ${typeof scopes}`);
        }

        this.scope = scopes.join(" ");
    }

    get scopes() {
        return this.scope;
    }
}