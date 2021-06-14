export default class Synckong {
    constructor(data) {
        this.signals = {}
        this.data = data
        this.observeData(data)
    }

    watch(property, handler) {
        if (!this.signals[property])
            this.signals[property] = []

        this.signals[property].push(handler)
    }

    notify(signal) {
        if (!this.signals[signal] || this.signals[signal].length < 1) return

        this.signals[signal].forEach((handler) => {
            console.groupCollapsed('Reacting...')
            console.log('changed: ', signal, ', call: ', handler.name)
            console.groupEnd()
            
            handler()
        })
    }

    makeReactive(obj, key) {
        let val = obj[key]

        Object.defineProperty(obj, key, {
            get: function () {
                return val
            },
            set: function (newVal) {
                val = newVal
                this.notify(key)
            }.bind(this)
        })
    }

    observeData(obj) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                this.makeReactive(obj, key)
            }
        }
    }
}