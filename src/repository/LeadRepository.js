const Repository = require("./Repository");
const leadModel = require("../collections/Lead");

class LeadRepository extends Repository {

    constructor() {
        super(leadModel);
    }

}

module.exports = LeadRepository;