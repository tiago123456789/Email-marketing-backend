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
            const buffer = new Buffer(35);

            response.writeHead(200, { "Content-Type": "image/gif" });
            response.end(buffer, "binary");
        } catch (error) {
            next(error);
        }
    }

    async linkEmailClicked(request, response, next) {
        try {
            const link = request.params.link;
            if (!link) {
                response.status(404).json({ msg: "Address url not found!" });
            }

            const idCampaign = request.params.idCampaign;
            const idLead = request.params.idLead;

            this._trackService.
                linkEmailClicked(idCampaign, idLead, link)
                .then(() => {
                    console.log(link);
                    
                });
                response.writeHead(302, {
                    'Location': link 
                })
                response.end();
            
        } catch(error) {
            next(error);
        }
    }
}

module.exports = TrackEndpoint;