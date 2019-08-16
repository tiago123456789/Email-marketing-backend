const LeadService = require("../service/LeadService");

class LeadEndpoint {

    constructor() {
        this._service = new LeadService();
        this.create = this.create.bind(this);
        this.findAll = this.findAll.bind(this);
        this.findById = this.findById.bind(this);
        this.update = this.update.bind(this);
        this.remove = this.remove.bind(this);
    }

    subscribe() {
        
    }

    async create(request, response, next) {
        try {
            const newRegister = request.body;
            await this._service.create(newRegister);
            response.sendStatus(201);
        } catch(error) {
            next(error);
        }
    }

    async findAll(request, response, next) {
        try {
            const leads = await this._service.findAll();
            response.json(leads);
        } catch(error) {
            next(error);
        }
    }


    async findById(request, response, next) {
        try {
            const id = request.params.id;
            const lead = await this._service.findById(id);
            response.json(lead);
        } catch(error) {
            next(error);
        }
    }

    async remove(request, response, next) {
        try {
            const id = request.params.id;
            await this._service.remove(id);
            response.sendStatus(204);
        } catch(error) {
            next(error);
        }
    }

    async update(request, response, next) {
        try {
            const id = request.params.id;
            const datasModified = request.body;
            await this._service.update(id, datasModified);
            response.sendStatus(204);
        } catch(error) {
            next(error);
        }
    }
    
}

module.exports = LeadEndpoint;