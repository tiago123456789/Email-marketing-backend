const express = require("express");
const UserEndpoint = require("../endpoint/UserEndpoint");

const userEndpoint = new UserEndpoint();
const router = express.Router();

module.exports = () => {

    router.post("/", userEndpoint.create);
    
    return router;
}