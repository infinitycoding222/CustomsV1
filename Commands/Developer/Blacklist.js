const Command = require('../../Structures/Command');
const ms = require('ms');
const HydraEmbed = require('../../Structures/SentientEmbed')
const User = require('../../Models/blacklist');
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['blacklist', 'blackl'],
            name: 'blacklist',
            category: 'Developer',
            description: ['Blacklists a user from using the bot'],
            disabled: false,
            clientPerms: [],
            userPerms: [],
            owner: true
        });
    }
    async run(message, args) {
        const user = this.client.users.cache.get(args[0]);
        if (!user) {
            return message.channel.send('You must input a User **ID**.');
        }

        const userData = await User.findOne({
            User: user.id
        });
        if (!userData) {
            const newUserData = new User({
                User: user.id,
                Blacklist: true,
                BlacklistedBy: message.author.id
            });
            newUserData.save();
            return message.channel.send(`${user.tag} was **Added** to Database and was blacklisted.`);
        } else {
            userData.Blacklist = false;
            userData.save();
            return message.channel.send(`${user.tag} was **Removed** from the blacklist database.`);
        }
    }
};