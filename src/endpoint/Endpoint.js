const { validationResult } = require('express-validator');

class Endpoint {

    validations() {
        return [];
    }

    isDataInvalid(request) {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
    }
}

module.exports = Endpoint;