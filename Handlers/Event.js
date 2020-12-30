const {
    readdirSync
} = require("fs"), {
        join
    } = require("path"),
    dir = join(__dirname, "..", 'Events')
module.exports.run = (client) => {
    let events = readdirSync(dir).filter(file => file.endsWith(".js"))
    for (const file of events) {
        const event = require(`${dir}/${file}`)

        client.on(file.split(".").shift(), event.bind(null, client))
        client.events.set(event, event)
    }
    // console.log(`${events.length} events loaded`)
}