const Event = require('../../Structures/Event')

module.exports = class extends Event {
    constructor(...args) {
        super(...args, {
            once: true
        })
    }
    run() {
        // console.log(`\n\n${this.client.chalk.green(`Prefix: ${this.client.prefix}`)}\n${this.client.chalk.yellow(`Commands: ${this.client.commands.size}`)}`)
        this.client.logger.normal("Client", `Ready as ${this.client.user.username}`)
        this.client.logger.api("API", `Guilds: ${this.client.guilds.cache.size.toLocaleString()}`)
        this.client.logger.api("API", `Users: ${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)
                .toLocaleString()}`)
        this.client.logger.shards("Shards", `Loaded: ${this.client.options.shards.map(x => x)
                .join(", ")} Shards`)
        this.client.logger.shards("Shards", `Total Shards: ${this.client.options.shardCount}`)
        this.client.logger.normal("Client", `Default Prefix: ${this.client.prefix}`)
        this.client.logger.normal("Client", `Ready at: ${this.client.readyAt.toLocaleString("en-Gb")}`)
        let act = [
            `${this.client.prefix}help`,
            `Servers: ${this.client.guilds.cache.size}`
        ]
        this.client.user.setStatus('dnd')
        let i = 0;
        setTimeout(() => {
            this.client.user.setActivity(act[i++ % act.length], {
                type: "LISTENING",
            });
        }, 3e5);
    }
}