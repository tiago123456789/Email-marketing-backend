const ListService = require("../service/ListService");
const app = require("../config/App");
const Token = require("../lib/Token");

class ListEndpoint {

    constructor() {
        this._service = new ListService();
        this.create = this.create.bind(this);
        this.findAll = this.findAll.bind(this);
        this.findById = this.findById.bind(this);
        this.update = this.update.bind(this);
        this.remove = this.remove.bind(this);
    }

    async create(request, response, next) {
        try {
            const newList = request.body;
            await this._service.create(newList);
            response.sendStatus(201);
        } catch(error) {
            next(error);
        }
    }

    async findAll(request, response, next) {
        try {
            const lists = await this._service.findAll();
            response.json(lists);
        } catch(error) {
            next(error);
        }
    }


    async findById(request, response, next) {
        try {
            const id = request.params.id;
            const list = await this._service.findById(id);
            response.json(list);
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

module.exports = ListEndpoint;