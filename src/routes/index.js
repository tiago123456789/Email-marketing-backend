const userRoutes = require("./User");
const authRoutes = require("./Auth");
const listRoutes = require("./List");
const leadRoutes = require("./Lead");
const campaignRoutes = require("./Campaing");

const LeadEndpoint = require("../endpoint/LeadEndpoint");
const auth = require("../middleware/AuthMiddleware");
const handlerException = require("../middleware/HandlerExceptionMiddleware");

const leadEndpoint = new LeadEndpoint();

module.exports = (app) => {

    app.use("/users", auth.hasPermission, userRoutes());
    app.use("/lists", auth.hasPermission, listRoutes());
    app.use("/leads", auth.hasPermission, leadRoutes());
    app.use("/campaigns", auth.hasPermission, campaignRoutes());   
    
    app.post("/subscribes", leadEndpoint.validations(), leadEndpoint.subscribe);
    
    app.use("/auth", authRoutes());
    
    // Handler exception trigger to the application.
    app.use(handlerException);
}