const {
    MessageEmbed
} = require("discord.js")
const custom = require("../Models/custom")

module.exports = {
    name: "list",
    category: "Custom Commands",
    run: async (client, message, args) => {
        let d = await custom.find({
            Guild: message.guild.id

        })
        let embed = new MessageEmbed()
            .setColor(client.config.color)
            .setAuthor(`Custom Commands for ${message.guild.name}`)
            .setDescription(`${d.map(x => `\`${x.Command}\``).join(", ") || "None"}`)
            .setFooter(client.config.purp, client.user.displayAvatarURL())
        message.channel.send(embed)
    }
}