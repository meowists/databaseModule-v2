const fs = require('fs')
const databases = []

class database  {

    constructor(name) {
        if (!fs.existsSync('./databases')) {
            fs.mkdirSync('./databases')
        }

        if (!fs.existsSync(`./databases/${name}.json`)) {
            fs.writeFileSync(`./databases/${name}.json`, '[]')
        }

        this.id = name
        this.data = []
        this.pull()

        databases.push(this)
    }

    findEntry(...arg) {
        return this.data.find(...arg)
    }

    newEntry(entry) {
        this.data.push(entry)
        this.push()
    }

    findEntryFromIndex(index) {
        return this.data[index]
    }

    removeEntry(entry) {
        this.data.splice(this.data.indexOf(entry), 1)
        this.push()
    }

    push() {
        fs.writeFileSync(`./databases/${this.id}.json`, JSON.stringify(this.data, null, 4))
    }

    pull() {
        this.data = JSON.parse(fs.readFileSync(`./databases/${this.id}.json`))
    }
}

module.exports.new = function(name) {
    return new database(name)
}

module.exports.get = function(id) {
    return databases.find((element) => element.id == id)
}