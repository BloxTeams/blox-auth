<div align="center">

<img src="https://user-images.githubusercontent.com/83887130/194349614-fc6b7d7d-5177-4673-b1b8-18c17e537dba.png" width="150px">

</div>

# blox-auth

BloxAuth is a JavaScript and Express compatible npm package to fasten the process of interacting with Roblox OAuth2.0 endpoints.

## Setup
BloxAuth requires a client representing your Roblox OAuth2.0 application. To initialize a client you can use the `Client` class.
```js
const bloxAuth = require("blox-auth");
const client = new bloxAuth.Client({
    client_id: "string",
    client_secret: "string",
    redirect_uri: "http://localhost:3000/auth/roblox/redirect",
    response_type: "Code",
    grant_type: "authorization_code"
});

client.config();
```

## Authorize middleware
You can handle authorization with the `authorize` middleware. Note that all operations with BloxAuth require you to have an initialized client.
```js
const express = require("express");
const app = express();

app.get("/", bloxAuth.authorize({
    scope: new bloxAuth.AuthorizationScopes(["openid", "profile", "universe-messaging-service:publish"]),
    prompts: "Login, Consent",
    state: "random-string"
}));

app.listen(3000, () => {
    console.log("Online on PORT 3000.");
})
```

## Token middleware
BloxAuth offers a way to obtain all authorization token data through a middleware. The `getToken` middleware will append the token's data to the request.
```js
req.bloxAuth: {
    tokenData: {...}
}
```
```js
const express = require("express");
const app = express();

app.get("/auth/roblox/redirect", bloxAuth.getToken, async (req, res) => {
    if (!req.bloxAuth) { //Check for BloxAuth data, if the request to obtain a token did not succeed req.bloxAuth will be null 
        return res.json({
            code: 400,
            message: "Authentication request failed."
        })
    }

    console.log(req.bloxAuth.tokenData);
});

app.listen(3000, () => {
    console.log("Online on PORT 3000.");
})
```

## User
BloxAuth offers a simple way of interacting with a user's data that can be accessed through OAuth2.0. This is done through the use of a `User` class.
```js
const express = require("express");
const app = express();

app.get("/auth/roblox/redirect", bloxAuth.getToken, async (req, res) => {
    if (!req.bloxAuth) { //Check for BloxAuth data, if the request to obtain a token did not succeed req.bloxAuth will be null 
        return res.json({
            code: 400,
            message: "Authentication request failed."
        })
    }

    const user = new bloxAuth.User(req.bloxAuth.tokenData.access_token); //The User class takes one argument which is the access_token of the authorizing user
    const userData = await user.getInfo().catch((err) => {
        console.log(err);
    })
    const userResources = await user.getResources().catch((err) => {
        console.log(err);
    })
});

app.listen(3000, () => {
    console.log("Online on PORT 3000.");
})
```

## user.getInfo()
The `getInfo()` method of the `User` class returns the information about a user. The call to this method may fail if the user did not authorize the required scopes.
```js
const express = require("express");
const app = express();

app.get("/auth/roblox/redirect", bloxAuth.getToken, async (req, res) => {
    if (!req.bloxAuth) { //Check for BloxAuth data, if the request to obtain a token did not succeed req.bloxAuth will be null 
        return res.json({
            code: 400,
            message: "Authentication request failed."
        })
    }

    const user = new bloxAuth.User(req.bloxAuth.tokenData.access_token); //The User class takes one argument which is the access_token of the authorizing user
    const userData = await user.getInfo().catch((err) => {
        console.log(err);
    });

    console.log(userData);
});

app.listen(3000, () => {
    console.log("Online on PORT 3000.");
})
```

## user.getResources()
The `getResources()` method of the `User` class returns the user's resources. The call to this method may fail if the user did not authorize the required scopes.
```js
const express = require("express");
const app = express();

app.get("/auth/roblox/redirect", bloxAuth.getToken, async (req, res) => {
    if (!req.bloxAuth) { //Check for BloxAuth data, if the request to obtain a token did not succeed req.bloxAuth will be null 
        return res.json({
            code: 400,
            message: "Authentication request failed."
        })
    }

    const user = new bloxAuth.User(req.bloxAuth.tokenData.access_token); //The User class takes one argument which is the access_token of the authorizing user
    const userResources = await user.getResources().catch((err) => {
        console.log(err);
    })

    console.log(userResources);
});

app.listen(3000, () => {
    console.log("Online on PORT 3000.");
})
```
