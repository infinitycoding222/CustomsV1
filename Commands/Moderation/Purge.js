const Command = require('../../Structures/Command');
const ms = require('ms');
const HydraEmbed = require('../../Structures/SentientEmbed')
module.exports = class extends Command {
constructor(...args) {
super(...args,
{
aliases: ['purge'],
name: 'purge',
category: 'Moderation',
description: ['Clears certain amount of messages'],
disabled: true,
clientPerms: ["MANAGE_MESSAGES"],
userPerms: ["MANAGE_MESSAGES"],
owner: false
});
}
async run(message, args) {
    if(!args[0] || isNaN(args[0]) || args[0] < 2 || args[0] > 100) return message.channel.send(new HydraEmbed().setDescription(`Please provide a **number** from \`2-100\``).setColor(this.client.config.denied));
    const deleted = await message.channel.messages.fetch({ limit: args[0] });    
      message.delete();
      try {
        message.channel.bulkDelete(deleted);
        return message.channel.send(new HydraEmbed().setDescription(`Deleted: \`${deleted.size}/${args[0]}\` messages.`).setColor(this.client.config.accepted))
            .then(m => m.delete({ timeout: 10000 }));
      } catch(err) {
        message.channel.send(new HydraEmbed().setColor(this.client.config.denied).setDescription(err))
      }
}
};