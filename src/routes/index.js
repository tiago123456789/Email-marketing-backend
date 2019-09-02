const userRoutes = require("./User");
const authRoutes = require("./Auth");
const listRoutes = require("./List");
const leadRoutes = require("./Lead");
const campaignRoutes = require("./Campaing");

const sgMail = require("@sendgrid/mail");
const track = require("../email/Track");
const Email = require("../email/Email");
const CampaingService = require("../service/CampaignService");
const LeadService = require("../service/LeadService");
const TrackEndpoint = require("../endpoint/TrackEndpoint");
const LeadEndpoint = require("../endpoint/LeadEndpoint");
const auth = require("../middleware/AuthMiddleware");
const handlerException = require("../middleware/HandlerExceptionMiddleware");
const trackEnpoint = new TrackEndpoint();
const leadEndpoint = new LeadEndpoint();
const campaignService = new CampaingService();
const leadService = new LeadService();

module.exports = (app) => {

    app.use("/users", auth.hasPermission, userRoutes());
    app.use("/lists", auth.hasPermission, listRoutes());
    app.use("/leads", auth.hasPermission, leadRoutes());
    app.use("/campaigns", auth.hasPermission, campaignRoutes());

    app.post("/subscribes", leadEndpoint.validations(), leadEndpoint.subscribe);
    app.get("/tracks/open/campaign/:idCampaign/lead/:idLead", trackEnpoint.emailOpened);
    app.get("/tracks/click/campaign/:idCampaign/lead/:idLead", trackEnpoint.linkEmailClicked);
    app.get("/teste", async (request, response) => {
        const campaigns = await campaignService.findByStatusNullAndStartLessThanNow();
        for (let campaign of campaigns) {
            const leads = await leadService.findByLists(campaign.lists);
            for (let lead of leads) {
                let body = campaign.body || "";
                body = track.addLinkClickedLinkEmail(body, campaign._id, lead._id);
                body = track.addLinkOpenedEmail(body, campaign._id, lead._id);
                await new Email()
                            .withFrom(lead.email)
                            .withSubject(campaign.title)
                            .withHtml(body).send();
            }
        }
        response.sendStatus(200);
    });

    app.use("/auth", authRoutes());

    // Handler exception trigger to the application.
    app.use(handlerException);
}