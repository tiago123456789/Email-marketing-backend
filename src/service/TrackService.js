const CampaignService = require("./CampaignService");
const LeadService = require("./LeadService");

class TrackService {

    constructor() {
        this._campaignService = new CampaignService();
        this._leadService = new LeadService();
    }

    emailOpened(idCampaign, idLead) {
        return this._catchAction(idCampaign, idLead, "open", "");
    }


    linkEmailClicked(idCampaign, idLead, link) {
        return this._catchAction(idCampaign, idLead, "click", link);
    }

    async _catchAction(idCampaign, idLead, action, link) {
        const campaign = await this._campaignService.findById(idCampaign);
        campaign.opens += 1;
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
    }
}

module.exports = TrackService;