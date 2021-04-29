const Command = require('../../Structures/Command');
const ms = require('ms');
const HydraEmbed = require('../../Structures/SentientEmbed')
const wrn = require("../../Models/Warns")
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['warns', 'infractions'],
            name: 'infractions',
            category: 'Moderation',
            description: ['Shows all infractions for a user'],
            disabled: false,
            clientPerms: [],
            userPerms: ["MANAGE_MESSAGES"],
            owner: false
        });
    }

    async run(message, args) {
        let t = message.mentions.members.first() || message.member;
        let w = await wrn.find({ Guild: message.guild.id, TargetID: t.user.id })
        let str = `${w.map(x => `\`#${x.CaseID}\` | **Moderator:** ${this.client.users.cache.get(x.ModID).tag}\n**Reason:** ${x.Reason}\n\n`)}`;
        message.channel.send(new HydraEmbed()
            .setWarn()
            .setDescription(str)
            .setAuthor(`All warns for ${t.user.tag}`, t.user.displayAvatarURL()))
    }
};