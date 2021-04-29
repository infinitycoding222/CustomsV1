const Command = require('../../Structures/Command');
const ms = require('ms');
const HydraEmbed = require('../../Structures/SentientEmbed')
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['roleinfo', 'ri'],
            name: 'roleinfo',
            category: 'Utils',
            description: [''],
            disabled: false,
            clientPerms: [],
            userPerms: [],
            owner: false
        });
    }
    async run(message, args) {
        let r = message.mentions.roles.first() || this.client.utils.getRole(message, args.join(" "));
        if (!r) return message.channel.send(new HydraEmbed()
            .setError(`Error`)
            .setDescription(`Please input a role name next time executing the command`))
        const embed = new HydraEmbed()
            .setColor(r.hexColor)
            .setDescription(`${r.name} Info`)
            .addField(`Name`, r.name, true)
            .addField(`ID`, r.id, true)
            .addField(`Members`, r.members.size, true)
            .addField(`Hoisted`, r.hoist ? "Yes" : "No", true)
            .addField(`Position`, r.position, true)
            .addField(`Created`, r.createdAt.toLocaleString("en-Gb", {
                long: true
            }), true)
            .addField(`Manageable`, r.managed ? "Yes" : "No", true)
        message.channel.send(embed)
    }
};