const Command = require('../../Structures/Command');
const ms = require('ms');
const HydraEmbed = require('../../Structures/SentientEmbed')
module.exports = class extends Command {
constructor(...args) {
super(...args,
{
aliases: ['ibl'],
name: 'ibl',
category: 'Infinity Bot List',
description: [''],
disabled: true,
clientPerms: [],
userPerms: [],
owner: false
});
}
async run(message, args) {
    let info = this.client.utils.iblget()
    let str = `Tags: ${info.tags}
        Prefix: ${info.prefix}
        Certified: ${info.certified ? "Yes" : "No"}
        Owner: ${info.owner}
        Servers: ${info.servers}
        Shards: ${info.shards}
        Votes: ${info.votes}
        Website: ${info.website}
        Donate: ${info.donate}
        Library: ${info.library}
        Support Server: ${info.support}`
    const embed = new HydraEmbed()
    .setAuthor(`${this.client.user.username}'s IBL Info`)
    .setDescription(str)
    message.channel.send(embed)
}
};