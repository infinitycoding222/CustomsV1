const Command = require('../../Structures/Command');
const ms = require('ms');
const HydraEmbed = require('../../Structures/SentientEmbed')
const Users = require("../../Models/blacklist")
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['blacklisted', "blisted"],
            name: 'blacklisted',
            category: 'Developer',
            description: [''],
            disabled: false,
            clientPerms: [],
            userPerms: [],
            owner: true
        });
    }
    async run(message, args) {
        const dev = message.mentions.members.first() || this.client.utils.getMember(message, args.join(" ")) || message.author;
        const user = await Users.find({
            BlacklistedBy: dev.id
        })
        let str = user.map(x => `**Blacklisted:** \`${this.client.users.cache.get(x.User).tag}\` - **Blacklisted By:** \`${message.author.tag}\` - **Blacklisted:** \`${x.Blacklist ? "Yes" : "No"}\`\n`)
        message.channel.send(new HydraEmbed().setColor(this.client.config.color).setDescription(str || "None").setFooter(`Users blacklisted by: ${dev.user.tag}`))
    }
};