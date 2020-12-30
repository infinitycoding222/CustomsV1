const {
    Schema,
    model
} = require("mongoose")

module.exports = model("clogs",
    new Schema({
        ChannelID: String,
        Guild: String
    }))