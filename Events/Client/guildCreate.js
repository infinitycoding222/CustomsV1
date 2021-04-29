const Event = require('../../Structures/Event')
const HydraEmbed = require('../../Structures/SentientEmbed')
const oc = require("../../Models/prefix")
module.exports = class extends Event {

    run(guild) {
        const ch = this.client.channels.cache.get(`740620851392675861`)
        ch.send(new HydraEmbed().setColor(this.client.config.color).setAuthor(`Guild Joined`).addField(`Guild Name:`, guild.name).addField(`Guild Owner`, this.client.users.cache.get(guild.ownerID).tag).addField(`Guild Members:`, guild.memberCount))
        oc.create({
            Guild: guild.id
        })
    }
}