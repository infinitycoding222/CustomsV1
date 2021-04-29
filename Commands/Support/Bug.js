const Command = require('../../Structures/Command');
const ms = require('ms');
const HydraEmbed = require('../../Structures/SentientEmbed')

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['bug'],
            name: 'bug',
            category: 'Support',
            description: ['Sends a bug report to support server'],
            disabled: false,
            clientPerms: [],
            userPerms: [],
            owner: false
        });
    }
    async run(message, args) {
        let text = args.join(" ")
        this.client.channels.cache.get("743044661211562047").send(new HydraEmbed()
            .setError(`Error`)
            .setDescription(text)
            .setTitle(`Bug Report Received`)
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()))
    }
};