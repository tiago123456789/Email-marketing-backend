const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const campaignSchema = new Schema({
    title: {
        type: String, required: [ true, "The field title is required."]
    },
    body: String,
    status: String,
    start: { type: Date, required: [ true, "The field start is required."]},
    opens: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    unsubscribe: { type: Numer, default: 0 },
    bounces: { type: Number, default: 0 },
    lists: [
        {
            title: String,
            type: Schema.Types.ObjectId, 
            ref: "lists"
        }
    ]
});

module.exports = mongoose.model("campaign", campaignSchema);