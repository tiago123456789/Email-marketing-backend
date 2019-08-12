const Repository = require("./Repository");
const userModel = require("../collections/User");

class UserRepository extends Repository {

    constructor() {
        super(userModel);
    }

    async findByEmail(email) {
        return this.getModel().find({ "email": email });
    }
}

module.exports = UserRepository;