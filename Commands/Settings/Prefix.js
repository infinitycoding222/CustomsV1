const Command = require('../../Structures/Command');
const cc = require('../../Models/prefix');
const HydraEmbed = require('../../Structures/SentientEmbed')
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['prefix'],
            name: 'prefix',
            category: 'Settings',
            description: ['Sets the bot prefix on the server'],
            disabled: false,
            clientPerms: [],
            userPerms: ["MANAGE_GUILD"],
            owner: false
        });
    }
    async run(message, args) {
        let prefix = args[0];
        this.client.prefix = prefix;
        this.client.config.prefix = prefix;
        cc.findOne({
            Guild: message.guild.id
        }, async (err, data) => {
            if (err) throw err;
            if (!data) {
                let ddata = new cc({
                    Guild: message.guild.id,
                    prefix: prefix
                })
                ddata.save()
                message.channel.send(`Set the server prefix to ${prefix}`)
            } else {
                data.prefix = prefix
                data.save()
                message.channel.send(`Updated the server prefix to ${prefix}`)
            }
        })
    }
};