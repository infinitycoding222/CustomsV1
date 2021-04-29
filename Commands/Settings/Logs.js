const Command = require('../../Structures/Command');
const l = require('../../Models/Logs');
const HydraEmbed = require('../../Structures/SentientEmbed')
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['logs'],
            name: 'logs',
            category: 'Settings',
            description: ['Sets the bot logs channel on the server'],
            disabled: false,
            clientPerms: [],
            userPerms: ["MANAGE_GUILD"],
            owner: false
        });
    }
    async run(message, args) {
        let ch = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        l.findOne({
            Guild: message.guild.id
        }, async (err, data) => {
            if (err) throw err;
            if (!data) {
                let ddata = new l({
                    Guild: message.guild.id,
                    LogsC: ch.id
                })
                ddata.save()
                message.channel.send(`Set the server logs to ${ch}`)
            } else {
                data.LogsC = ch;
                data.save()
                message.channel.send(`Updated the server prefix to ${ch}`)
            }
        })
    }
};