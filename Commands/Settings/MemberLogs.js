const Command = require('../../Structures/Command');
const ms = require('ms');
const {
    MessageEmbed
} = require('discord.js')
const m = require("../../Models/member_logs")
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['member_logs', 'mlogs'],
            name: 'member_logs',
            category: 'Settings',
            description: ['Sets all member logs to a channel'],
            disabled: false,
            clientPerms: ["SEND_MESSAGES", "EMBED_LINKS"],
            userPerms: ["MANAGE_GUILD"],
            owner: false
        });
    }
    async run(message, ...args) {
        let channel = message.mentions.channels.first();
        m.findOne({
            Guild: message.guild.id,
        }, async (err, data) => {
            if (err) throw err;
            if (!data) {
                let ddata = new m({
                    Guild: message.guild.id,
                    channel: channel.id
                })
                ddata.save();
                message.channel.send(`Set Member Logs to ${channel}`)
            } else if (data) {
                data.channel = channel.id;
                data.save();
                message.channel.send(`Updated member logs to ${channel}`)
            }
        })
    }
};