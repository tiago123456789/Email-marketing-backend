module.exports = (error, request, response, next) => {
    switch(error.name) {
        case "LOGIC_NEGOTIATION":
            return response.status(409).json({ msg: error.message });
        default:
            return response.status(500).json({ msg: error.message });
    }
};