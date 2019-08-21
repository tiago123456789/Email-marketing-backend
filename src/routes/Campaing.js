const express = require("express");
const CampaingEndpoint = require("../endpoint/CampaignEndpoint");

const campaingEndpoint = new CampaingEndpoint();
const router = express.Router();

module.exports = () => {

    router.get("/", campaingEndpoint.findAll);
    router.get("/:id", campaingEndpoint.findById);
    router.put("/:id", campaingEndpoint.update);
    router.delete("/:id", campaingEndpoint.remove);
    router.post("/", campaingEndpoint.create);
    
    return router;
}