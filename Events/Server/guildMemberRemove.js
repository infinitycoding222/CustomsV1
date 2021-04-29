const Event = require('../../Structures/Event')
const {
    MessageEmbed
} = require('discord.js')
const m = require("../../Models/member_logs")
module.exports = class extends Event {
    async run(member) {
        // let c = await m.findOne({
        //     Guild: member.guild.id
        // })
        // if(!c) return;
        // let ch = this.client.channels.cache.get(c.channel)
        // // console.log(ch, c.channel
        // if (!ch) return;
        // ch.send(new MessageEmbed().setColor("DARK_RED").setDescription(`**${member.user.tag}** has decided to leave us!`).setImage(member.user.displayAvatarURL({
        //     size: 1024,
        //     dynamic: true
        // })).setFooter(`Members: ${member.guild.memberCount}`));
    }
}