const Event = require('../../Structures/Event');
const HydraEmbed = require('../../Structures/SentientEmbed');
const c = require("../../Models/Logs");
const moment = require("moment")
module.exports = class extends Event {

    async run(message) {
        if (!message.guild || message.author.bot) return;
        this.client.snipes.set(message.channel.id, {
            sender: message.author.tag,
            content: message.content,
            date: moment(),
            image: message.attachments.first() ? message.attachments.map(img => img.proxyURL) : undefined
        })
        const attachments = message.attachments.size ? message.attachments.map(attachment => attachment.proxyURL) : null;
        const embed = new HydraEmbed()
            .setAuthor(message.author.tag, this.client.user.displayAvatarURL({
                dynamic: true
            }))
            .setTitle('Message Deleted')
            .setDescription([
                `**> Message ID:** ${message.id}`,
                `**> Channel:** ${message.channel}`,
                `**> Author:** ${message.member.displayName}`,
                `${attachments ? `**> Attachments:** ${attachments.join('\n')}` : ''}`
            ]);
        if (message.content.length) {
            embed.splitFields(`**> Deleted Message:**`, message.content);
        }
    const cj = await c.findOne({
        Guild: message.guild.id
    })
        if(!cj) return;
        const sc = this.client.channels.cache.get(cj.LogsC)
        if(!sc) return;
        sc.send(embed)
    }

};