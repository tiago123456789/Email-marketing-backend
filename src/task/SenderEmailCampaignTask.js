const Email = require("../email/Email");
const track = require("../email/Track");
const CampaignService = require("../service/CampaignService");
const LeadService = require("../service/LeadService");
const leadService = new LeadService();
const campaignService = new CampaignService();

async function execute() {
    try {
        await campaignService.findByStatusNullAndStartLessThanNow().then(console.log);
        const campaigns = await campaignService.findByStatusNullAndStartLessThanNow();
        campaigns.forEach(async campaign => {
            const lead = await leadService.findByLists(campaign.lists);
            let body = campaign.body || "";
            body = track.addLinkClickedLinkEmail(body, campaign._id, lead[0]._id);
            body = track.addLinkOpenedEmail(body, campaign._id, lead[0]._id);
            new Email()
                .withFrom(lead.email)
                .withSubject(campaign.title)
                .withHtml(body)
                .send()
                .catch(console.log)
        });
        setTimeout(() => execute(), 1000);
    } catch(error) {
        console.log(error);
    }
}


execute();