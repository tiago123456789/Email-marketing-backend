const UserService = require("../service/UserService");
const app = require("../config/App");
const Token = require("../lib/Token");

class UserEndpoint {

    constructor() {
        this._service = new UserService();
        this._token = new Token();
        this.create = this.create.bind(this);
        this.me = this.me.bind(this);
    }

    async me(request, response, next) {
        try {
            const accessToken = request.header(app.PARAM_AUTH_HEADER);
            const email = this._token.getValueInPayload("email", accessToken);
            const user = await this._service.findByEmail(email);
            user.password = "";
            response.json(user);
        } catch(error) {
            next(error);
        } 
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