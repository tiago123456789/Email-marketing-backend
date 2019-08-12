const UserService = require("../service/UserService");

class UserEndpoint {

    constructor() {
        this._service = new UserService();
        this.create = this.create.bind(this);
    }

    async create(request, response, next) {
        try {
            const newUser = request.body;
            await this._service.create(newUser);
            response.json(newUser);
        } catch(error) {
            next(error);
        }
    }
}

module.exports = UserEndpoint;