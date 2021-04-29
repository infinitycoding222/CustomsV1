const Command = require('../../Structures/Command');
const ms = require('ms');
const HydraEmbed = require('../../Structures/SentientEmbed')
module.exports = class extends Command {
constructor(...args) {
super(...args,
{
aliases: ['reload-cmds', 'rcmd'],
name: 'commands-reload',
category: 'Developer',
description: ['Reloads all commands'],
disabled: false,
clientPerms: [],
userPerms: [],
owner: true
});
}
async run(message, _args) {
    this.client.utils.loadCommands().then(() => message.channel.send(`Executed Protocol 2, Sir! [Reloading all commands]!`))  .catch(err => message.channel.send(`There was a error trying to load the commands!\n**Error:**\`\`\`xl\n${err}\n\`\`\``));
}
};