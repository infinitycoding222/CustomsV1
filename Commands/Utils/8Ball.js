const Command = require('../../Structures/Command');
const ms = require('ms');
const HydraEmbed = require('../../Structures/SentientEmbed')
/**
 * TODO:
 * - Add more possible answers
 * */
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['8ball'],
            name: '8ball',
            category: 'Utils',
            description: ['Outputs a random answer to question'],
            disabled: true,
            clientPerms: [],
            userPerms: [],
            owner: false
        });
    }
    async run(message, args) {
        const answers = [
            `Yes`,
            `No`,
            `Maybe Yes`,
            `Maybe No`,
            `Definetly`,
            `I don't think so`,
            `Why are you asking me?`,
            `Why are you trying?`,
            `What do u think?`,
        ];
        let random = answers[Math.floor(Math.random() * answers.length)];
        const embed = new HydraEmbed(message)
            .setDescription(`Question: ${args.join(' ')}\nAnswer: ${random}`)
            .setTitle(`Magic 8Ball`)
        // console.log(args.join(" "))
        message.channel.send(embed)
    }
};