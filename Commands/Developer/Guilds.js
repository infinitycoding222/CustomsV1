const Command = require('../../Structures/Command');
const ms = require('ms');
const HydraEmbed = require('../../Structures/SentientEmbed')
module.exports = class extends Command {
constructor(...args) {
super(...args,
{
aliases: ['guilds', "sl", "gl", `servers`, `servers-list`, `guilds-list`],
name: 'guilds',
category: 'Developer',
description: ['Shows the servers the bot is in'],
disabled: false,
clientPerms: [],
userPerms: [],
owner: true
});
}
async run(message, args) {
    const guilds = this.client.guilds.cache;
    message.channel.send(new HydraEmbed().setDescription(`\`\`\`${guilds.map(x => x.name + " <=> " + x.memberCount.toLocaleString()).join("\n")}\`\`\``).setTitle(`Total Servers: ${guilds.size}\nServer Name <=> Server Members`))
}
}