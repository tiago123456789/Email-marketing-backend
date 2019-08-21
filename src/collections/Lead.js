const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const leadSchema = new Schema({
    email: {
        type: String, required: [ true, "The field email is required."], unique: true
    },
    data: [
        {
            label: String,
            value: String
        }
    ],
    lists: [
        {
            type: Schema.Types.ObjectId, 
            ref: "lists"
        }
    ],
    actions: [
        {
            type: Schema.Types.ObjectId,
            ref: "lists",
            action: [
                {  
                    type: String,
                    link: String,
                    date: Date
                }
            ]
        }
    ]
});

module.exports = mongoose.model("lead", leadSchema);