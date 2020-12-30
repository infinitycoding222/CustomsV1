const {
    Schema,
    model
} = require("mongoose")

module.exports = model("croles", new Schema({
    role: String,
    gid: String
}))