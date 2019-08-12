const jwt = require("jsonwebtoken");
const SecurityException = require("../exception/SecurityException");

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
        await this._encryptSecret();
        return jwt(this._payload, this._secret, { expiresIn: this._timeExpired() })
    }

    async isValid($token) {
        try {
            await this._encryptSecret();
            jwt.verify(token, this._secret);
        } catch(error) {
            throw new SecurityException("FORBIDDEN", "Token invalid!");
        }
    }

    async _encryptSecret() {
        const saltRounds = 10;
        this._secret = await bcrypt.hash(this._secret, saltRounds);
    }
}

module.exports = Token;