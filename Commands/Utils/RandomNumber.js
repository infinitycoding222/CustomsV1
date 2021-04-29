const Command = require('../../Structures/Command');
const ms = require('ms');
const HydraEmbed = require('../../Structures/SentientEmbed')

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['randomnumber', 'randomn', `rn`],
            name: 'random-number',
            category: 'Utils',
            description: ['Provides a random number 0 - your choice by providing args'],
            disabled: false,
            clientPerms: [],
            userPerms: [],
            owner: false
        });
    }

    async run(message, args) {
        let n = this.client.utils.randomNumber(args[0])
        let embed = new HydraEmbed()
            .setTitle(`Picked random number upto ${args[0]}`)
            .setDescription(`Number is: ${n.Number}`)
    }
}