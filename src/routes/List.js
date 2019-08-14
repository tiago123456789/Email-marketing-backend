const express = require("express");
const ListEndpoint = require("../endpoint/ListEndpoint");

const listEndpoint = new ListEndpoint();
const router = express.Router();

module.exports = () => {

    router.get("/", listEndpoint.findAll);
    router.get("/:id", listEndpoint.findById);
    router.put("/:id", listEndpoint.update);
    router.delete("/:id", listEndpoint.remove);
    router.post("/", listEndpoint.create);
    
    return router;
}