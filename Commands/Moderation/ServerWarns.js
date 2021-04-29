const Command = require('../../Structures/Command');
const m = require('../../Models/Warns');
const HydraEmbed = require('../../Structures/SentientEmbed')

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['server-warns', 'swarns'],
            name: 'server-warns',
            category: 'Moderation',
            description: ['Shows all server warns'],
            disabled: false,
            clientPerms: [],
            userPerms: ["MANAGE_MESSAGES"],
            owner: false
        });
    }

    async run(message, args) {
let w = await m.find({ Guild: message.guild.id });
        let str = w.map(x => `\`#${x.CaseID}\` | **Moderator:** ${this.client.users.cache.get(x.ModID).tag} - ${this.client.users.cache.get(x.TargetID).tag} - Reason: **${x.Reason}**`)
        const embed = new HydraEmbed()
            .splitFields(`All Server Warns`, str)
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        message.channel.send(embed)
    }
}