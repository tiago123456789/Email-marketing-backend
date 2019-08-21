const Repository = require("./Repository");
const listModel = require("../collections/List");

class ListRepository extends Repository {

    constructor() {
        super(listModel);
    }

    findByTitle(title) {
        return this.getModel().findOne({ title });
    }

}

module.exports = ListRepository;