const {
    MessageEmbed
} = require("discord.js")

module.exports = {
    name: "stats",
    category: "System",
    run: async (client, message, args) => {
        message.channel.send(new MessageEmbed()
            .setColor(client.config.color)
            .addField(`Client Name:`, client.user.username, true)
            .addField(`Users`, client.guilds.cache.reduce((a, b) => a + b.memberCount, 0), true)
            .addField(`Servers`, client.guilds.cache.size, true)
            .addField(`Client Purpose`, client.config.purp, true)
            .addField(`Discord.JS Version`, require("discord.js").version, true)
            .addField(`Client Version`, require("../package.json").version, true)
            .addField(`Client Uptime`, require("ms")(client.uptime, {
                long: true
            }), true)
            .addField(`Client Developers`, client.users.cache.get(client.config.owners), true)
            .setThumbnail(client.user.displayAvatarURL()))
    }
}