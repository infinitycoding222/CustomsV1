const Command = require('../../Structures/Command');
const ms = require('ms');
const {
    MessageEmbed
} = require('discord.js')
// TODO:
//  - Fix the time
// *
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['remindme', 'remind', 'meremind'],
            name: 'remindme',
            category: 'Utils',
            description: ['Reminds you with a DM in a certain time for something'],
            usage: 'time to remind',
            disabled: false,
            clientPerms: [],
            userPerms: [],
            owner: false
        });
    }
    async run(message, args) {
        let time = args[0];
        let reason = args.slice(1).join(" ")
        if (!reason) reason = "Right Back"
        time = ms(time)
        let returntime = ms(time, {
            long: true
        })
        if (time < ms('5s')) return message.channel.send(`Please input a time longer/equal than/to 5 seconds`)
        if(time >= ms("30d")) return message.channel.send(`Please input time under 30 days`)
        message.channel.send(`Alright, i will remind you in ${returntime}`)
        setTimeout(function () {
            message.reply(new MessageEmbed()
                .setColor('#1f3a93')
                .setDescription(":clock:**REMIND**:clock:")
                .addField(`Reason for remind:`, reason))
        }, time)
    }
};