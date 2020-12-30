const {
    MessageEmbed
} = require("discord.js")
const prefix = require("../Models/cprefix")
const cc = require("../Models/custom")

module.exports = (client, guild) => {
    cc.deleteMany({
        Guild: guild.id
    })
    prefix.deleteMany({
        Guild: guild.id
    })
    let channel = client.channels.cache.get("757647653470208040")
    channel.send(new MessageEmbed()
        .setColor("RED")
        .setAuthor(`Guild Left`)
        .addField(`**Name:**`, `${guild.name}`)
        .addField(`**Owner**`, `${guild.owner.user.tag}`)
        .addField(`**Member Count**`, `${guild.memberCount.toLocaleString()}`))
    client.utils.iblpost(client.guilds.cache.size, 2)
}