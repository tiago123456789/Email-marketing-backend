const jwt = require("jsonwebtoken");
const SecurityException = require("../exception/SecurityException");
const app = require("../config/App");

class Token {

    constructor() {
        this._secret = process.env.TOKEN_SECRET;
        this._payload = [];
        this._timeExpired = () => (Math.floor(Date.now() / 1000) + (15 * 60));
    }

    withTimeExpired(timeExpired) {
        this._timeExpired = timeExpired
        return this;
    }

    withPayload(key, value) {
        this._payload[key] = value;
        return this;
    }

    async build() {
        return app.PARAM_PREFIX_TOKEN + jwt.sign(
            {...this._payload, exp: this._timeExpired() },
            this._secret
        );
    }

    async isValid(token) {
        try {
            jwt.verify(token, this._secret);
        } catch(error) {
            throw new SecurityException("FORBIDDEN", "Token invalid!");
        }
    }
}

module.exports = Token;