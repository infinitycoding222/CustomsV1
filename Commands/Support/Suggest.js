const Command = require('../../Structures/Command');
const ms = require('ms');
const HydraEmbed = require('../../Structures/SentientEmbed')

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['suggest'],
            name: 'suggest',
            category: 'Support',
            description: ['Sends a suggestion to support server'],
            disabled: false,
            clientPerms: [],
            userPerms: [],
            owner: false
        });
    }
    async run(message, args) {
        let text = args.join(" ")
        this.client.channels.cache.get("743044682795450389").send(new HydraEmbed()
            .setTitle(`Suggestion Received`)
            .setDescription(text)
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()))
    }
};