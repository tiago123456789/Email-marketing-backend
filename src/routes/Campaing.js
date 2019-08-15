const express = require("express");
const CampaingEndpoint = require("../endpoint/CampaignEndpoint");

const campaingEndpoint = new CampaingEndpoint();
const router = express.Router();

module.exports = () => {

    router.get("/", campaignEndpoint.findAll);
    router.get("/:id", campaignEndpoint.findById);
    router.put("/:id", campaignEndpoint.update);
    router.delete("/:id", campaignEndpoint.remove);
    router.post("/", campaignEndpoint.create);
    
    return router;
}