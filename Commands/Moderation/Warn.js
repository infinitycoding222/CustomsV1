const Command = require('../../Structures/Command');
const moment = require('moment');
const HydraEmbed = require('../../Structures/SentientEmbed')
const wrn = require("../../Models/Warns")
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['warn'],
            name: 'warn',
            category: 'Moderation',
            description: ['Warns a member'],
            disabled: false,
            clientPerms: ["MANAGE_MESSAGES"],
            userPerms: ["MANAGE_MESSAGES"],
            owner: false
        });
    }

    async run(message, args) {
        const target = message.mentions.members.first() || this.client.users.cache.get(args[0]);
        const warner = message.author;
        let rsn = args.slice(1).join(" ")
        if(!target) return message.channel.send(`Please specify who u want to warn`)
        if(!rsn) rsn = "No Reason Provided by Moderator";
        if(target.user.id === message.guild.ownerID) return message.channel.send(`You cannot warn the server owner!`)
        if(target.user.id === warner.id) return message.channel.send(`You cant warn yourself`)
        const info = {
            Guild: message.guild.id,
            TargetID: target.id,
            ModID: warner.id,
            Reason: rsn,
        }
        wrn.findOne({
            Guild: message.guild.id,
        }, async (err, data) => {
            if (err) throw err;
            if (!data) {
                let ddata = new wrn({
                    Guild: message.guild.id,
                    TargetID: target.user.id,
                    ModID: warner.id,
                    Reason: rsn,
                    CaseID: "1",
                    Date: moment()
                })
                ddata.save();
                message.channel.send(new HydraEmbed()
                    .setSuccess(`Success`)
                    .setDescription(`Warned **${target.user.tag}** with reason \`${rsn}\``)
                    .setAuthor(`${warner.tag}`, warner.displayAvatarURL())
                    .setThumbnail(message.guild.iconURL()))
            } else {
                let ddata = new wrn({
                    Guild: message.guild.id,
                    TargetID: target.user.id,
                    ModID: warner.id,
                    Reason: rsn,
                    CaseID: `${data.length + 1}`
                })
                ddata.save();
                message.channel.send(new HydraEmbed()
                    .setSuccess(`Success`)
                    .setDescription(`Warned **${target.user.tag}** with reason \`${rsn}\``)
                    .setAuthor(`${warner.tag}`, warner.displayAvatarURL())
                    .setThumbnail(message.guild.iconURL()))
            }
        })
        target.send(`Hello, you have been warned in **${message.guild.id}** for \`${rsn}\``)
        }
    }