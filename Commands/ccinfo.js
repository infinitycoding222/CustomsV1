const {
    MessageEmbed
} = require("discord.js")
const custom = require("../Models/custom");

module.exports = {
    name: "cc-info",
    category: "Custom Commands",
    run: async (client, message, args) => {
        let embed = new MessageEmbed().setColor(client.config.color).setAuthor(`Custom Commands Info`)
        let d = await custom.find({
            Guild: message.guild.id
        });
        embed.setDescription(d.map(x => `Name: \`${x.Command}\` - Content: \`${x.Content.substr(0, 50)}\``))
        embed.setColor(client.config.color)
        embed.setFooter(client.config.purp)
        embed.setAuthor(`All Custom Commands Info`)
        message.channel.send(embed)
    }
}