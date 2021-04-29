const Event = require('../../Structures/Event');
const HydraEmbed = require('../../Structures/SentientEmbed');
const User = require('../../Models/blacklist');
module.exports = class extends Event {

    async run(message) {
        const userData = await User.findOne({
            User: message.author.id
        });
        const mentionRegex = new RegExp(`^<@!${this.client.user.id}>$`);
        const mentionRegexPrefix = new RegExp(`^<@!${this.client.user.id}> `);
        if (message.author.bot) return;
        if (message.content.match(mentionRegex)) message.channel.send(new HydraEmbed().setDescription(`My prefix for \`${message.guild.name}\` is \`${this.client.config.prefix}\`\nType: \`${this.client.config.prefix}help\` for all commands of the bot`));
        const {
            prefix
        } = this.client.config;
        const prefix1 = message.content.match(mentionRegexPrefix) ? message.content.match(mentionRegexPrefix)[0] : prefix;
        if (!message.content.startsWith(prefix1)) return;
        if (this.client.protocol_1 === true && !this.client.owners.includes(message.author.id)) return message.reply(`Sorry, you cant use this bot while \`Protocol 1 [Developer Mode]\` is active.`)
        const [cmd, ...args] = message.content.slice(prefix1.length).trim().split(/ +/g);
        const command = this.client.commands.get(cmd.toLowerCase()) || this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()));
        if (command) {
            if (userData && userData.Blacklist === true) {
                return message.channel.send(new HydraEmbed().setError(``).setDescription(`You have been **blacklisted** by ${this.client.users.cache.get(userData.BlacklistedBy).tag} from using this bot\nIf you think this is a mistake Join the [Support Server](https://discord.gg/zxFvKQ5) and in the #blacklist channel send a message using the pinned format!`, this.client.user.displayAvatarURL()))
            }
            if (command.owner && !this.client.utils.checkOwner(message.author.id)) {
                return message.channel.send(new HydraEmbed().setWarn().setDescription('Sorry, this command can only be used by the bot owners.'));
            }
            if (command.disabled && !this.client.utils.checkOwner(message.author.id)) {
                return message.channel.send(new HydraEmbed().setError().setDescription(`Only bot owner can use this command while its disabled`))
            }
            if (command.guildOnly && !message.guild) {
                return message.channel.send(new HydraEmbed().setError().setDescription('Sorry, this command can only be used in a discord server.'));
            }

            if (command.nsfw && !message.channel.nsfw) {
                return message.channel.send(new HydraEmbed().setError().setDescription('Sorry, this command can only be ran in a NSFW marked channel.'));
            }

            if (command.args && !args.length) {
                return message.channel.send(new HydraEmbed().setError().setDescription(`Sorry, this command requires arguments to function. Usage: ${this.client.prefix + command.name} ${command.usage || 'This command doesn\'t have a usage format'}`));
            }
            if (message.guild) {
                const userPermCheck = command.userPerms ? this.client.defaultPerms.add(command.userPerms) : this.client.defaultPerms;
                if (message.guild && userPermCheck) {
                    const missing = message.channel.permissionsFor(message.member).missing(userPermCheck);
                    if (missing.length) {
                        return message.channel.send(new HydraEmbed().setError().setDescription(`You are missing ${this.client.utils.formatArray(missing.map(this.client.utils.formatPerms))} permissions, you need them to use this command!`));
                    }
                }

                const botPermCheck = command.clientPerms ? this.client.defaultPerms.add(command.clientPerms) : this.client.defaultPerms;
                if (message.guild && botPermCheck) {
                    const missing = message.channel.permissionsFor(this.client.user).missing(botPermCheck);
                    if (missing.length) {
                        return message.channel.send(new HydraEmbed().setError().setDescription(`I am missing ${this.client.utils.formatArray(missing.map(this.client.utils.formatPerms))} permissions, I need them to run this command!`));
                    }
                }
            }
            command.run(message, args);
        }
    }
}