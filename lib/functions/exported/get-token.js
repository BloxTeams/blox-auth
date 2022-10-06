const fetch = require("node-fetch");

module.exports = async (req, res, next) => {
    const bloxAuth = require("../../blox-auth");
    const options = bloxAuth.config;
    const code = req.query.code;

    if (!code) {
        return next();
    }

    const tokenReqParams = new URLSearchParams({
        client_id: options.client_id,
        client_secret: options.client_secret,
        code: code,
        grant_type: options.grant_type,
    })
    
    const tokenRes = await fetch("https://apis.roblox.com/oauth/v1/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: tokenReqParams
    })

    if (!tokenRes.ok) {
        return next();
    }

    req.bloxAuth = {}
    req.bloxAuth.tokenData = await tokenRes.json();

    next();
}