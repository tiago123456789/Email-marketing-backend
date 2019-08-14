const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const listSchema = new Schema({
    title: {
        type: String, required: [ true, "The field title is required."]
    },
    quantity: {
        type: Number, default: 0
    }
});

module.exports = mongoose.model("lists", listSchema);