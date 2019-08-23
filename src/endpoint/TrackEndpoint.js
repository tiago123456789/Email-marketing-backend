const TrackService = require("../service/TrackService");

class TrackEndpoint {

    constructor() {
        this._trackService = new TrackService();
        this.emailOpened = this.emailOpened.bind(this);
        this.linkEmailClicked = this.linkEmailClicked.bind(this);
    }

    async emailOpened(request, response, next) {
        try {
            const idCampaign = request.params.idCampaign;
            const idLead = request.params.idLead;
            await this._trackService.emailOpened(idCampaign, idLead);
            const buffer = Buffer.from(35);

            response.writeHead(200, { "Content-Type": "image/gif" });
            response.end(buffer, "binary");
        } catch (error) {
            next(error);
        }
    }

    async linkEmailClicked(request, response, next) {
        try {
            const link = request.query.link;
            if (link) {
                response.status(404).json({ msg: "Address url not found!" });
            }

            const idCampaign = request.params.idCampaign;
            const idLead = request.params.idLead;

            await this._trackService.linkEmailClicked(idCampaign, idLead, link);
            res.writeHead(302, { 'Location': link });
            res.end();
        } catch(error) {
            next(error);
        }
    }
}

module.exports = TrackEndpoint;