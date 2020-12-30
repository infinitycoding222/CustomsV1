const {
    MessageEmbed
} = require("discord.js");
module.exports = {
    name: "ping",
    category: "System",
    run: async (client, message, args) => {
        message.channel.send(`Ping! \`${client.ws.ping}\`ms`);
    }
}