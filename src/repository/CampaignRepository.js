const Repository = require("./Repository");
const campaignModel = require("../collections/Campaign");

class CampaignRepository extends Repository {

    constructor() {
        super(campaignModel);
    }

    findByStatusNullAndStartLessThanNow() {
        return this.getModel().find({ status: null , start: { $lt: new Date() }});
    }

}

module.exports = CampaignRepository;