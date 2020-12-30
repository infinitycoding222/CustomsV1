const {
    MessageEmbed
} = require("discord.js")
const prefix = require("../Models/cprefix")

module.exports = {
    name: "prefix",
    category: "Configuration",
    run: async (client, message, args) => {
        if (!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send(`:x: Sorry, you have incorrect permissions to execute that command\n\`Manage Server\``)
        let prefx = args[0];
        if (!prefx) return message.channel.send(`:warning: Must input one word prefix!`)
        await prefix.updateOne({
            Guild: message.guild.id,
            Prefix: prefx
        })
        message.channel.send(`Prefix was updated to \`${prefx}\``)
    }
}