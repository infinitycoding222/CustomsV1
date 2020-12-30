// const IBLTest = require("testwr")
// const test = new IBLTest("756911074883797153", "ohxrkjr9464wnxawlwo30850qlsthriy")
module.exports = async client => {
    console.log([
        `[Client] => Ready!`,
        `[Client] => Default Prefix ","`,
        `[MongoDB] => Connected`,
        `[API] => Users - ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}`,
        `[API] => Servers - ${client.guilds.cache.size}`
    ].join("\n"))
    client.user.setStatus("idle")
    client.user.setActivity(`${client.config.prefix}help`, {
        type: "WATCHING"
    })
    // client.utils.iblPost(client.guilds.cache.size, 1)
    // await console.log(IBLTest.GetBot("756911074883797153"))
}