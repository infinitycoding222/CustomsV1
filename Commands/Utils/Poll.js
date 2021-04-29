const Command = require('../../Structures/Command');
const ms = require('ms');
const HydraEmbed = require('../../Structures/SentientEmbed')
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['poll'],
            name: 'poll',
            category: 'Utils',
            description: [''],
            disabled: false,
            clientPerms: [],
            userPerms: [],
            owner: false
        });
    }
    async run(message, args) {
        let poll = args.join(" ")
        const embed = new HydraEmbed().setColor(this.client.config.color).setAuthor(`Poll by: ${message.author.tag}`).setDescription(poll).setFooter(`To upvote / downvote react to one of the emojis below`)
        const mesg = message.channel.send(embed).then(msg => {
            msg.react("👍")
            msg.react("👎")
            msg.react("🤷‍♂️")
        })
    }
}