const {
    readdirSync
} = require("fs")

const {
    join
} = require("path")
const cmddir = join(__dirname, "..", "Commands")

module.exports.run = client => {
    for (const cmd of readdirSync(cmddir).filter(file => file.endsWith(".js"))) {
        const p = require(`${cmddir}/${cmd}`)
        client.commands.set(p.name, p)
    }
}