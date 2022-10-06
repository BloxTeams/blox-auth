const specialKeysCallbacks = {};

specialKeysCallbacks.scope = (authorizationParams, scope) => {
    authorizationParams.scope = scope.scope;
}

module.exports = (params) => {
    return (req, res, next) => {
        const bloxAuth = require("../../blox-auth");
        const options = bloxAuth.config;

        const authorizationParams = {
            client_id: options.client_id,
            redirect_uri: options.redirect_uri,
            response_type: options.response_type
        };
        
        for (const [key, value] of Object.entries(params)) {
            if (specialKeysCallbacks[key]) {
                specialKeysCallbacks[key](authorizationParams, value);

                continue;
            }

            authorizationParams[key] = value;
        }
    
        const authorizationUrlParams = new URLSearchParams(authorizationParams).toString();
        
        res.redirect(`https://authorize.roblox.com?${authorizationUrlParams}`);
    }
}