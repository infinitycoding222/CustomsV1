const fetch = require("node-fetch")

class Utils {
    // constructor(client) {
    //     super(client)
    // }
    proper(string) {
        return string.split(' ').map(str => str.slice(0, 1).toUpperCase() + str.slice(1)).join(" ")
    }
    removeDuplicates(arr) {
        return [...new Set(arr)]
    }
    // iblPost(servers, shards) {
    //     return fetch(`https://infinitybotlist.com/api/bots/`, {
    //         method: "POST",
    //         headers: {
    //             Authorization: "ohxrkjr9464wnxawlwo30850qlsthriy",
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             "servers": servers,
    //             "shards": shards
    //         })
    //     })
    // }
    iblGet() {
        return fetch(`https://infinitybotlist.com/api/bots//info`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(async res => {
            console.log(res.json())
        })
    }
    foo() {
        return this.bar;
    }
}

module.exports = Utils;