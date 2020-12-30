const {
    Schema,
    model
} = require("mongoose");
module.exports = model(
    "testing",
    new Schema({
        Guild: String,
        Command: String,
        Content: String,
    })
);