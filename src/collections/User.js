const encryptPassword = require("./middleware/encryptPassword");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String, require: true
    },
    email: {
        type: String, require: true
    },
    password: {
        type: String, require: true
    }
    ,
    accounts: [
        {
            name: {
                type: String, require: true
            },
            role: {
                type: String, require: true
            },
            enabled: {
                type: Boolean, default: false
            }
        }
    ]
});

userSchema.pre("save", encryptPassword);

module.exports = mongoose.model("user", userSchema);