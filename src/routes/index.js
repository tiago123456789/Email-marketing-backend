const userRoutes = require("./User");
const handlerException = require("../middleware/HandlerExceptionMiddleware");

module.exports = (app) => {

    app.use("/users", userRoutes());

    // Handler exception trigger to the application.
    app.use(handlerException);
}