const Repository = require("./Repository");
const campaignModel = require("../collections/Campaign");

class CampaignRepository extends Repository {

    constructor() {
        super(campaignModel);
    }

}

module.exports = CampaignRepository;