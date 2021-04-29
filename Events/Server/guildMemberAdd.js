const Event = require('../../Structures/Event')
const {
    MessageEmbed
} = require('discord.js')
const m = require("../../Models/member_logs")
const HydraEmbed = require('../../Structures/SentientEmbed')
module.exports = class extends Event {
    async run(member) {
        // let c = await m.findOne({
        //     Guild: member.guild.id
        // })
        // let ch = this.client.channels.cache.get(c.channel)
        // // console.log(ch, c.channel
        // if (!ch) return;
        // ch.send(new HydraEmbed().setColor("DARK_GREEN").setDescription(`**${member.user.tag}** has joined our server!`).setImage(member.user.displayAvatarURL({
        //     size: 1024,
        //     dynamic: true
        // })).setAuthor(`Members: ${member.guild.memberCount}`));
    }
}