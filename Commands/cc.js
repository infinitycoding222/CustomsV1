const {
    MessageEmbed
} = require("discord.js");
const custom = require("../Models/custom")
module.exports = {
    name: "cc",
    category: "Custom Commands",
    run: async (client, message, args) => {
        if (!message.member.permissions.has("MANAGE_MESSAGES"))
            return message.channel.send(`:x: You do not have enough permissions!`);
        if (!args[0])
            return message.channel.send(`:warning: You did not specify a custom command name!`);
        if (!args.slice(1).join(" "))
            return message.channel.send(`:warning: No content specified!`);
        custom.findOne({
                Guild: message.guild.id,
                Command: args[0]
            },
            async (err, data) => {
                if (err) throw err;
                if (data) {
                    data.Content = args.slice(1).join(" ");
                    data.save();

                    message.channel.send(
                        `Successfully updated the command \`${args[0]}\``
                    );
                } else if (!data) {
                    let newData = new custom({
                        Guild: message.guild.id,
                        Command: args[0],
                        Content: args.slice(1).join(" "),
                    });
                    newData.save();
                    message.channel.send(
                        `Successfully created the command \`${args[0]}\``
                    );
                }
            }
        );
    }
}