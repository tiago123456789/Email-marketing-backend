const Repository = require("./Repository");
const leadModel = require("../collections/Lead");

class LeadRepository extends Repository {

    constructor() {
        super(leadModel);
    }

    findByEmail(email) {
        return this.getModel().findOne({ email: email });
    }

    

}

module.exports = LeadRepository;