module.exports = (error, request, response, next) => {
    switch(error.name) {
        case "UNAUTHORIZATED":
            return response.status(401).json({ msg: error.message });
        case "FORBIDDEN":
            return response.status(403).json({ msg: error.message });
        case "LOGIC_NEGOTIATION":
            return response.status(409).json({ msg: error.message });
        default:
            return response.status(500).json({ msg: error.message });
    }
};