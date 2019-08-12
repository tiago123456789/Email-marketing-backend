const UserService = require("../service/UserService");

class AuthEndpoint {

    constructor() {
        this._service = new UserService();
        this.authenticate = this.authenticate.bind(this);
    }

    async authenticate(request, response, next) {
        try {
            const credentials = request.body;
            const accessToken = await this._service.authenticate(credentials);
            response.json({ accessToken });
        } catch(error) {
            next(error);
        }
    }
}


module.exports = AuthEndpoint;