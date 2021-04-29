const Command = require('../../Structures/Command');
const ms = require('ms');
const HydraEmbed = require('../../Structures/SentientEmbed')
const m = require("../../Models/member_logs")
const p = require('../../Models/prefix')
const l = require("../../Models/Logs")
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['config'],
            name: 'config',
            category: 'Settings',
            description: ['Shows all settings'],
            disabled: false,
            clientPerms: [],
            userPerms: [],
            owner: false
        });
    }
    async run(message, args) {
        let c = await m.findOne({
            Guild: message.guild.id
        })
        let p12 = await p.findOne({
            Guild: message.guild.id
        })
        let lo = await l.findOne({
            Guild: message.guild.id
        })
        message.channel.send(new HydraEmbed().setDescription(`Logs are sent to \`${this.client.channels.cache.get(lo.LogsC).name}\`\nMember logs are sent to \`${this.client.channels.cache.get(c.channel).name}\`\nPrefix is \`${p12.prefix}\``))
    }
};