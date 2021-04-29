const Command = require('../../Structures/Command');
const ms = require('ms');
const HydraEmbed = require('../../Structures/SentientEmbed')

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['snipe'],
            name: 'snipe',
            category: 'Moderation',
            description: ['Snipes a deleted message'],
            disabled: false,
            clientPerms: [],
            userPerms: ["MANAGE_MESSAGES"],
            owner: false
        });
    }

    async run(message, args) {
    const channel = message.mentions.channels.first() || message.channel;
    let snipe = this.client.snipes.get(channel.id)
        if (!snipe)
            return message.channel.send(
                new HydraEmbed()
                    .setError(`test`)
                    .setDescription(
                        `There is no recently deleted messages in: ${channel}`));
        let embed = new HydraEmbed()
            .setDescription(`Author: ${snipe.sender}\nTimestamp: ${snipe.date}`)
            .splitFields(`Deleted Message`, snipe.content)
            .setWarn(`Warn`)
            .setAuthor(`Channel #${channel.name}`, message.guild.iconURL())
        if(snipe.image) embed.attachFiles(snipe.image)
        message.channel.send(embed)
    }
};