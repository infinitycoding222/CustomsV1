const Command = require('../../Structures/Command');
const moment = require('moment');
const ms = require('ms');
const {
    MessageEmbed,
    version: djs
} = require('discord.js')
const {
    version
} = require("../../package.json")
const os = require("os")
const cpuStat = require("cpu-stat")
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['botinfo', 'bi'],
            name: "stats",
            category: "Utils",
            disabled: false,
            clientPerms: [],
            userPerms: [],
            owner: false
        });
    }
    async run(message, ...args) {
        // if (!args[0]) {
        let core = os.cpus()[0];
        // let changes = this.client.db.get(`changes`);
        let embedStats = new MessageEmbed()
            .setColor(this.client.config.color)
            .addFields({
                name: "Name",
                value: this.client.user.username,
                inline: true
            }, {
                name: "Developers",
                value: ["473276250815856650"].map(x => this.client.users.cache.get(x).tag),
                inline: true
            }, {
                name: "Version",
                value: require("../../config.json").config.version,
                inline: true
            }, {
                name: "Servers",
                value: this.client.guilds.cache.size.toLocaleString(),
                inline: true
            }, {
                name: `Users`,
                value: this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString(),
                inline: true
            }, {
                name: "Channels",
                value: this.client.channels.cache.size.toLocaleString()
            }, {
                name: "Uptime",
                value: ms(this.client.uptime, {
                    long: true
                }),
                inline: true
            }, {
                name: "Library",
                value: require("discord.js").version,
                inline: true
            }, {
                name: "Language",
                value: "JavaScript",
                inline: true
            }, {
                name: "Total Commands",
                value: this.client.commands.size,
                inline: true
            }, {
                name: "Last Restart",
                value: this.client.readyAt.toLocaleString("en-Gb"),
                inline: true
            }, {
                name: "Created At",
                value: this.client.user.createdAt.toLocaleString("en-Gb"),
                inline: true
            })
            .addField(`Vote`, `[Infinity Bot List](https://infinitybots.xyz/${this.client.user.id}/v)\n[Discord Bots](https://discordbots.co/bot/firee)`, true)
            .setDescription(`Made by: Fire Development LCL`, this.client.user.displayAvatarURL(), true)
            .addField(`Vexer Monitoring`, `[Click Me!](https://stats.uptimerobot.com/vRgMnuWXxz)`)
            .setFooter(this.client.config["config"].copyright)
            .setThumbnail(this.client.user.displayAvatarURL())
        // .setImage(`https://infinitybotlist.com/bots/${this.client.user.id}/widget?size=large`)
        message.channel.send(embedStats)
        // }
        // if (args[0] == 'ibl') {
        //     const info = this.client.utils.iblget();
        //     const str = `Tags: ${info.tags}
        //                  Prefix: ${info.prefix}
        //                  Owner: ${info.heller}
        //                  Votes: ${info.votes}
        //                  Website: ${info.website}
        //                  Donate: ${info.donate}
        //                  Support Server: ${info.support}
        //                  Staff: ${info.staff ? "Yes" : "No"}`
        //     message.channel.send(new MessageEmbed().setDescription(str).setAuthor(`Stats in Infinity Bot List`, this.client.user.displayAvatarURL()))
        // }
    }
}