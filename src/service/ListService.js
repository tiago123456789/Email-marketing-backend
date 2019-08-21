const ListRepository = require("../repository/ListRepository");
const NotFoundException = require("../exception/NotFoundException");

class ListService {

    constructor() {
        this._repository = new ListRepository();
    }

    findByTitle(title) {
        return this._repository.findByTitle(title);
    }

    findAll() {
        return this._repository.findAll();
    }

    async findById(id) {
        const list = await this._repository.findById(id);
        if (!list) {
            throw new NotFoundException("List not found.")
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

    create(newList) {
        return this._repository.create(newList);
    }

}

module.exports = ListService;