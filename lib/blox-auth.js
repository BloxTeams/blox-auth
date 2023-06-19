//Export properties

exports.config = {};

//Export methods

exports.authorize = require("./functions/exported/authorize");
exports.getToken = require("./functions/exported/get-token");

//Export classes

exports.Client = require("./classes/client");
exports.User = require("./classes/user");
exports.AuthorizationScopes = require("./classes/auth-scopes");