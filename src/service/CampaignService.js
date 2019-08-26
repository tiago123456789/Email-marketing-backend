const CampaignRepository = require("../repository/CampaignRepository");
const NotFoundException = require("../exception/NotFoundException");

class CampaignService {

    constructor() {
        this._repository = new CampaignRepository();
    }

    findByStatusNullAndStartLessThanNow() {
        return this._repository.findByStatusNullAndStartLessThanNow();
    }

    findAll() {
        return this._repository.findAll();
    }

    async findById(id) {
        const list = await this._repository.findById(id);
        if (!list) {
            throw new NotFoundException("Campaign not found.")
        }

        return list;
    }

    async update(id, datasModified) {
        await this.findById(id);
        return this._repository.update(id, datasModified);
    }

    async remove(id) {
        await this.findById(id);
        return this._repository.remove(id);
    }

    create(newRegister) {
        return this._repository.create(newRegister);
    }

}

module.exports = CampaignService;