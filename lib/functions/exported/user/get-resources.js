const fetch = require("node-fetch");

module.exports = (user) => {
    return new Promise(async (resolve, reject) => {
        const bloxAuth = require("../../../blox-auth");
        
        const reqParams = new URLSearchParams({
            token: user.token,
            client_id: bloxAuth.config.client_id,
            client_secret: bloxAuth.config.client_secret
        });

        const res = await fetch("https://apis.roblox.com/oauth/v1/token/resources", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: reqParams
        })

        const data = await res.json().catch((err) => {
            return reject(err);
        });

        if (!res.ok) {
            return reject(data);
        }

        resolve(data);
    })
}