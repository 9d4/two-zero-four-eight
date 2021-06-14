import Constants from "./Constants.js";
import Synckong from "./private/Synckong.js";

export default class View {
    constructor(gridEl) {
        this.el = gridEl
        this.store = new Synckong({
            model: null,
            view: null
        })

        this.store.watch('model', _render.bind(this))
    }

    init() {
        // init model
        this.store.data.model = _generateModelArray.call(this)

        // init view

    }


}

function _getColEl() {
    const col = document.createElement('div')
    col.classList.add('col')

    return col
}

function _generateModelArray() {
    let model = []

    for (let row = 0; row < 4; row++) {
        model.push([])

        for (let col = 0; col < 4; col++) {
            model[row].push(Constants.EMPTY)
        }
    }

    return model
}

function _render() {
    const model = this.store.data.model

    if (this.store.data.view === null) {
        let _view = [];

        for (let row = 0; row < model.length; row++) {
            _view.push([])

            for (let col = 0; col < model[row].length; col++) {
                let __col = _getColEl()

                _view[row].push(__col)
                this.el.append(__col)
            }
        }

        this.store.data.view = _view
    } else {
        for (let row = 0; row < model.length; row++) {
            for (let col = 0; col < model[row].length; col++) {
                this.store.data.view[row][col].textContent = model[row][col]
            }
        }
        console.log('changed')
    }
}