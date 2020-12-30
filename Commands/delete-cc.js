const {
    MessageEmbed
} = require("discord.js")
const custom = require("../Models/custom")

module.exports = {
    name: "delcc",
    category: "Custom Commands",
    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send(`:warning: Please input a custom command name to delete`)
        if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(`:x: You need Manage Messages Permissions to run this command!`)
        let d = custom.findOne({
            Guild: message.guild.id,
            Command: args[0]
        });
        (await d).deleteOne()
        message.channel.send(`Successfully deleted the command \`${args[0]}\``)
    }
}