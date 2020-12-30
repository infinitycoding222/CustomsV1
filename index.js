const {
    Client,
    Collection
} = require("discord.js")
const {
    config
} = require("./config")
const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://test:koteto05@cluster0-zpdsy.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const Utils = require("./Functions/Utils")
const client = new Client();

client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();
client.config = config;
client.developers = config.owners;
client.utils = new Utils(client);

const cmd = require("./Handlers/Command")
cmd.run(client)

const ev = require("./Handlers/Event")
ev.run(client)

client.login(config.token)