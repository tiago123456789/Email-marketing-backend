const LeadRepository = require("../repository/LeadRepository");
const ListService = require("../service/ListService");
const NotFoundException = require("../exception/NotFoundException");

class LeadService {

    constructor() {
        this._repository = new LeadRepository();
        this._listService = new ListService();
    }

    async subscribe(datas) {
        let list = await this._listService.findByTitle(datas.list);
        const isNullList = list == null || list.length == 0;
        if (!isNullList) {
            list.quantity += 1;
            list.save();
        } else {
            list = await this._listService.create({ title: datas.list, quantity: 1 });
        }

        const lead = await this._repository.findByEmail(datas.email);
        const isNullLead = lead == null || lead.length == 0;
        if (!isNullLead) {
            lead.lists.push(list);
            lead.save();
        } else {
            await this._repository.create({
                email: datas.email,
                lists: [ list ]
            });
        }
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