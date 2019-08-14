const Repository = require("./Repository");
const listModel = require("../collections/List");

class ListRepository extends Repository {

    constructor() {
        super(listModel);
    }

}

module.exports = ListRepository;