const bcrypt = require("bcryptjs");

module.exports = async function(next) {
    const saltRounds = 10;
    try {
        this.password = await bcrypt.hash(this.password, saltRounds);
        next();
    } catch(e) {
        console.log(e);
    }
}