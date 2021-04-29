const Event = require("../../Structures/Event")
const HydraEmbed = require("../../Structures/SentientEmbed")
const l = require("../../Models/Logs")

module.exports = class extends Event {
    async run(guild, user) {
        let lc = await l.findOne({ Guild: guild.id })
        if(!lc) return;
        let c = this.client.channels.cache.get(lc.LogsC)
        if(!c) return;
        c.send(new HydraEmbed()
            .setWarn(`Warning`)
            .setAuthor(`[Server Member Unbanned]`, guild.iconURL())
            .setDescription(`**User:** \`${user.tag}\` was unbanned from server`))
    }
}