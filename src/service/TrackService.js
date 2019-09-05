const CampaignService = require("./CampaignService");
const LeadService = require("./LeadService");

class TrackService {

    constructor() {
        this._campaignService = new CampaignService();
        this._leadService = new LeadService();
        this._counter = 1;
    }

    emailOpened(idCampaign, idLead) {
        return this._catchAction(idCampaign, idLead, "open", "");
    }


    async linkEmailClicked(idCampaign, idLead, link) {
        return this._catchAction(idCampaign, idLead, "click", link);
    }

    async _catchAction(idCampaign, idLead, action, link) {
        console.log(this._counter);
        const campaign = await this._campaignService.findById(idCampaign);
        if (action == "open") {
            campaign.opens += 1;
        } else if (action == "click") {
            campaign.clicks += 1
        }

        campaign.save();

        const lead = await this._leadService.findById(idLead);
        lead.actions.push({
            campaign: campaign,
            action: {
                typed: action,
                link: link,
                date: Date.now()
            }
        });
        return lead.save();
    }
}

module.exports = TrackService;