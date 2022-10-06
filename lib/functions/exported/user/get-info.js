const fetch = require("node-fetch");

module.exports = (user) => {
    return new Promise(async (resolve, reject) => {

        const res = await fetch("https://apis.roblox.com/oauth/v1/userinfo", {
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
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