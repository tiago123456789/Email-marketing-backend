const userRoutes = require("./User");
const authRoutes = require("./Auth");
const auth = require("../middleware/AuthMiddleware");
const handlerException = require("../middleware/HandlerExceptionMiddleware");

module.exports = (app) => {

    app.use("/users", auth.hasPermission, userRoutes());
    app.use("/auth", auth.hasPermission, authRoutes());
    
    // Handler exception trigger to the application.
    app.use(handlerException);
}