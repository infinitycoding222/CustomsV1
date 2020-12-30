module.exports = (client, error) => {
    client.channels.cache.get("758741954908651620").send(`:x: Error: ${error.message}\nStack: ${error.stack}`)
}