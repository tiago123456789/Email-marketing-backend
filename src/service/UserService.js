const UserRepository = require("../repository/UserRepository");
const LogicNegotiation = require("../exception/LogicNegotiationException");

class UserService {

    constructor() {
        this._repository = new UserRepository();
    }

    async create(newUser) {
        const userUsedEmail = await this._repository.findByEmail(newUser.email);
        if (userUsedEmail) {
            throw new LogicNegotiation("Email already used.");
        }

        return this._repository.create(newUser);
    }

}

module.exports = UserService;