const UserRepository = require("../repository/UserRepository");
const LogicNegotiation = require("../exception/LogicNegotiationException");
const SecurityException = require("../exception/SecurityException");
const Token = require("../lib/Token");
const bcrypt = require("bcryptjs");

class UserService {

    constructor() {
        this._repository = new UserRepository();
        this._token = new Token();
    }

    async findByEmail(email) {
        let user = await this._repository.findByEmail(email);
        const isNull = user.length == 0;
        if (!isNull) {
            user = user[0];
        }
        return user;
    }

    async authenticate(credentails) {
        if (!credentails.email || !credentails.password) {
            throw new SecurityException(null, "Datas invalid!");
        }

        let user = await this.findByEmail(credentails.email);
        const isPaswordValid = await bcrypt.compare(credentails.password, user.password);

        if (!isPaswordValid) {
            throw new SecurityException(null, "Datas invalid!");
        }

        return this._token
                    .withPayload("name", user.name)
                    .withPayload("email", user.email)
                    .build();
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