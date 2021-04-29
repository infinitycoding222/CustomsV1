const Event = require('../../Structures/Event');
const HydraEmbed = require('../../Structures/SentientEmbed');
const {
    Util: {
        escapeMarkdown
    }
} = require('discord.js');
const {
    diffWordsWithSpace
} = require('diff');
const c = require("../../Models/Logs");
module.exports = class extends Event {

    async run(old, message) {
        if (!message.guild || old.content === message.content || message.author.bot) return;

        const embed = new HydraEmbed()
            .setColor(this.client.config.color)
            .setAuthor(old.author.tag, this.client.user.displayAvatarURL({
                dynamic: true
            }))
            .setTitle('Message Updated')
            .setDescription([
                `**> Message ID:** ${old.id}`,
                `**> Channel:** ${old.channel}`,
                `**> Author:** ${old.author.tag} (${old.author.id})`
            ])
            .setURL(old.url)
            .splitFields(`**> Updated Message:** ` + diffWordsWithSpace(escapeMarkdown(old.content), escapeMarkdown(message.content))
                .map(result => result.added ? `**${result.value}**` : result.removed ? `~~${result.value}~~` : result.value)
                .join(' '));

        const cj = await c.findOne({
            Guild: message.guild.id
        })
        if(!cj) return;
        const sc = this.client.channels.cache.get(cj.LogsC)
        if(!sc) return;
        sc.send(embed)
    }

};