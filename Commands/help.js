const {
    MessageEmbed
} = require("discord.js")
const prefix = require("../Models/cprefix")
module.exports = {
    name: "help",
    category: "System",
    run: async (client, message, args) => {
        let cmd = client.commands.get(args[0]);
        let pr = await prefix.findOne({
            Guild: message.guild.id
        })
        let e = new MessageEmbed()
            .setTitle(`Help Command | Prefix in Server is: \`${pr.Prefix}\` `)
            .setColor(client.config.color)
            .setFooter(client.config.purp)
        if (!cmd) {
            let categories;
            if (!client.developers.includes(message.author.id)) {
                categories = client.utils.removeDuplicates(client.commands.filter(cmd => cmd.category).map(x => x.category))
            } else {
                categories = client.utils.removeDuplicates(client.commands.map(x => x.category));
            }
            for (const category of categories) {
                e.addField(`${client.utils.proper(category)} - ${client.commands.filter(c => c.category === category).size}`, `${client.commands.filter(cmd => cmd.category === category).map(x => `\`${x.name}\``)}`)
            }
            message.channel.send(e)
        } else {
            let em = new MessageEmbed()
                .setAuthor(`${client.utils.proper(cmd.name)} | Information`)
                .addField(`Name:`, cmd.name, true)
                .addField(`Category:`, cmd.category, true)
                .setColor(client.config.color)
                .setFooter(client.config.purp)
            message.channel.send(em)
        }
    }
}