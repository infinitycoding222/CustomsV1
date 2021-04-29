const Event = require("../../Structures/Event")
const HydraEmbed = require("../../Structures/SentientEmbed")
const l = require("../../Models/Logs")

module.exports = class extends Event {
    async run(oldMember, newMember) {
        let lc = await l.findOne({ Guild: oldMember.guild.id })
        if(!lc) return;
        let c = this.client.channels.cache.get(lc.LogsC)
        if(!c) return;
        c.send(new HydraEmbed()
                .setSuccess(`Success`)
                .setThumbnail(oldMember.user.displayAvatarURL())
                .setTitle(`${oldMember.user.tag}`)
                .setAuthor(`[Server Member Updated]`, oldMember.guild.iconURL())
                .setDescription(`**Before Update**:
                                 Nickname: ${oldMember.nickname || oldMember.user.tag}
                                 Roles: ${oldMember.roles.cache.filter(f => f.name !== "@everyone").sort((a, b) => b.position - a.position).map(x => x.toString()).join(", ")}`))
            c.send(new HydraEmbed()
                .setSuccess(`Success`)
                .setThumbnail(newMember.user.displayAvatarURL())
                .setTitle(`${newMember.user.tag}`)
                .setAuthor(`[Server Member Updated]`, newMember.guild.iconURL())
                .setDescription(`**After Update:**
                                 Nickname: ${newMember.nickname || newMember.user.tag}
                                 Roles: ${newMember.roles.cache.filter(f => f.name !== "@everyone").sort((a, b) => b.position - a.position).map(x => x.toString()).join(", ")}`))
    }
}