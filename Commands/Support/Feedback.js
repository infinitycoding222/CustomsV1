const Command = require('../../Structures/Command');
const ms = require('ms');
const HydraEmbed = require('../../Structures/SentientEmbed')

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['feedback'],
            name: 'feedback',
            category: "Support",
            description: ['Sends Your feedback in our support server'],
            disabled: false,
            clientPerms: [],
            userPerms: [],
            owner: false
        });
    }

    async run(message, args) {
    let text = args.join(" ");
    let channel = this.client.channels.cache.get("791276803846963251")
        channel.send(new HydraEmbed()
            .setAuthor(`Feedback by: ${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(text)
            .setTitle(`Feedback Received`, message.guild.iconURL()))
    }
};