const Command = require('../../Structures/Command');
const moment = require("moment");
const HydraEmbed = require('../../Structures/SentientEmbed')
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['2020+1', `year`],
            name: '2021',
            category: 'Utils',
            description: ['Shows the current left time until 2021!'],
            disabled: false,
            clientPerms: [],
            userPerms: [],
            owner: false
        });
    }
    async run(message, args) {
        const now = new Date();
        const next = new Date(now);
        next.setFullYear(now.getFullYear() + 1);
        next.setHours(0, 0, 0, 0);
        next.setMonth(0, 1);
        const duration = next - now;
        const seconds = Math.floor((duration / 1000) % 60);
        const minutes = Math.floor((duration / 1000 / 60) % 60);
        const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
        const days = Math.floor(duration / (1000 * 60 * 60 * 24));

        const embed = new HydraEmbed()
            .setAuthor("Next Year!", message.author.displayAvatarURL())
            .setDescription(`There are **${days} days**, **${hours} hours**, **${minutes} minutes** and **${seconds} seconds** until **${next.getFullYear()}**!\n\n\nOr, in short, ${moment.duration(next - now).humanize()}.`)
        message.channel.send(embed);
    }
};