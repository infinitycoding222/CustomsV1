const {
    MessageEmbed
} = require("discord.js");
const custom = require("../Models/custom");
const prefix = require("../Models/cprefix");
module.exports = async (client, message) => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    let c = await prefix.findOne({
        Guild: message.guild.id
    });
    if (!c.Prefix) c.Prefix = client.config.prefix;
    const mentionRegex = new RegExp(`^<@!${client.user.id}>$`)
    if (message.content.match(mentionRegex)) return message.channel.send(new MessageEmbed().setColor(client.config.color)
        .setDescription(`My Prefix Here is: \`${c.Prefix}\``))
    if (!message.content.startsWith(c.Prefix)) return;
    const [cmd, ...args] = message.content.toLowerCase().slice(c.Prefix.length).trim().split(/ +/g);
    const command = client.commands.get(cmd);
    if (command) {
        command.run(client, message, args)
        console.log(`[Client, Server] - Command ${command.name} has been executed by ${message.author.tag} in ${message.guild.name} `)
    } else {
        // console.log(custom)
        custom.findOne({
                Guild: message.guild.id,
                Command: cmd
            },
            async (err, data) => {
                // console.log(data)
                if (err) throw err;
                if (data) return message.channel.send(data.Content);
            }
        );
    }
}