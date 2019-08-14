const userRoutes = require("./User");
const authRoutes = require("./Auth");
const listRouters = require("./List");
const auth = require("../middleware/AuthMiddleware");
const handlerException = require("../middleware/HandlerExceptionMiddleware");

module.exports = (app) => {

    app.use("/users", auth.hasPermission, userRoutes());
    app.use("/lists", auth.hasPermission, listRouters());
    
    app.use("/auth", authRoutes());
    
    // Handler exception trigger to the application.
    app.use(handlerException);
}