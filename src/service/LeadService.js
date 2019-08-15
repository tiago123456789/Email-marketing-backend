const LeadRepository = require("../repository/LeadRepository");
const NotFoundException = require("../exception/NotFoundException");

class LeadService {

    constructor() {
        this._repository = new LeadRepository();
    }

    findAll() {
        return this._repository.findAll();
    }

    async findById(id) {
        const list = await this._repository.findById(id);
        if (!list) {
            throw new NotFoundException("Lead not found.")
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

module.exports = LeadService;