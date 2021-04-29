const Command = require('../../Structures/Command');
const ms = require('ms');
const HydraEmbed = require('../../Structures/SentientEmbed')
module.exports = class extends Command {
constructor(...args) {
super(...args,
{
aliases: ['reload-evs', 'rev'],
name: 'events-reload',
category: 'Developer',
description: ['Reloads all events'],
disabled: false,
clientPerms: [],
userPerms: [],
owner: true
});
}
async run(message, _args) {
    this.client.utils.loadEvents().then(() => message.channel.send(`Executed Protocol 3, Sir! [Reloading all events]!`)).catch(err => message.channel.send(`There was a error trying to load the commands!\n**Error:**\`\`\`xl\n${err}\n\`\`\``));
}
};