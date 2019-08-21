const express = require("express");
const LeadEndpoint = require("../endpoint/LeadEndpoint");

const leadEndpoint = new LeadEndpoint();
const router = express.Router();

module.exports = () => {

    router.get("/", leadEndpoint.findAll);
    router.get("/:id", leadEndpoint.findById);
    router.put("/:id", leadEndpoint.update);
    router.delete("/:id", leadEndpoint.remove);
    router.post("/", leadEndpoint.create);
    
    return router;
}