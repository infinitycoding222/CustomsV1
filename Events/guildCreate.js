const {
    MessageEmbed
} = require("discord.js")
const prefix = require("../Models/cprefix")
const cc = require("../Models/custom")
module.exports = (client, guild) => {
    prefix.create({
        Guild: guild.id,
        Prefix: "c?"
    })
    // cc.create({
    //     Guild: guild.id
    // })
    let channel = client.channels.cache.get("757647653470208040")
    channel.send(new MessageEmbed()
        .setColor("GREEN")
        .setAuthor(`Guild Joined`)
        .addField(`**Name:**`, `${guild.name}`)
        .addField(`**Owner**`, `${guild.owner.user.tag}`)
        .addField(`**Member Count**`, `${guild.memberCount.toLocaleString()}`))
}