const Command = require('../../Structures/Command');
const ms = require('ms');
const HydraEmbed = require('../../Structures/SentientEmbed')
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['kick'],
            name: 'kick',
            category: 'Moderation',
            description: ['Kicks a user from the server'],
            disabled: false,
            clientPerms: ["KICK_MEMBERS"],
            userPerms: ["KICK_MEMBERS"],
            owner: false
        });
    }
    async run(message, args) {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        let reason = args.slice(1).join(" ");
        if (!member) return message.reply(`You must provide a member to kick`);
        if (!reason) reason = "No reason is provided by moderator / admin";
        member.kick(reason);
        member.send(new HydraEmbed().customFooter().setDescription(`Hello, you have been Kicked from ${message.guild.name} by ${message.author.tag} for ${reason}`))
        message.channel.send(new HydraEmbed().customFooter().setDescription(`Kicked ${member.user.tag} for ${reason}`).setTitle(`Action: Kick by ${message.author.tag}`))
    }
};