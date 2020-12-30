const {
    MessageEmbed
} = require("discord.js")
const {
    type
} = require("os")
const {
    inspect
} = require("util")
const sourcebin = require('sourcebin');
const {
    Type
} = require('@extreme_hero/deeptype');
module.exports = {
    name: "eval",
    category: "Developer",
    run: async (client, message, args) => {
        if (message.author.id === `473276250815856650`) {
            const msg = message;
            if (!args.length) return message.channel.send('You must provide something to evaluate.');
            let code = args.join(' ');
            code = code.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");

            let evaled;
            try {
                const start = process.hrtime();
                evaled = eval(code);
                if (eval instanceof Promise) {
                    evaled = await evaled;
                }

                const stop = process.hrtime(start);
                const response = [
                    `**Output**: \`\`\`js\n${clean(inspect(evaled, { depth: 0 }))}\n\`\`\``,
                    `**Type:** \`\`\`ts\n${new Type(evaled).is}\n\`\`\``,
                    `**Time:** \`\`\`${(((stop[0] * 1e9) + stop[1])) / 1e6}ms \`\`\``
                ]
                const res = response.join('\n');
                if (res.length < 2000) {
                    await message.channel.send(res)
                } else {
                    let output = await sourcebin.create([{
                        name: 'output',
                        content: res,
                        languageId: 'js'
                    }], {
                        title: 'Evaluation Output',
                        description: 'Outcome of eval command.'
                    });
                    output = await sourcebin.shorten(output.url);

                    await message.channel.send(output);
                }
            } catch (err) {
                return message.channel.send(`Error: \`\`\`xl\n${clean(err)}\n\`\`\``);
            }
        } else {
            message.channel.send(`No No No`)
        }

        function clean(text) {
            if (typeof text === 'string') {
                text = text
                    .replace(/`/g, `\`${String.fromCharCode(8203)}`)
                    .replace(/@/g, `@${String.fromCharCode(8203)}`)
                    .replace(new RegExp(client.token, 'gi'), '****')
            }
            return text;
        }
    }
}