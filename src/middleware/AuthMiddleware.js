const Token = require("../lib/Token");
const SecurityException = require("../exception/SecurityException");

const token = new Token();

module.exports = {

    async hasPermission(request, response, next) {
        let accessToken = request.header("Authorization");

        if (!accessToken) {
            throw new SecurityException(null, "Token invalid!");
        }

        accessToken = accessToken.replace("Bearer ", "");
        try {
            await token.isValid(accessToken);
        } catch(error) {
            console.log(error);
        }
        next();
    }
}