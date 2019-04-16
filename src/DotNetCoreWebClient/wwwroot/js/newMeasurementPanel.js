class NewMeasurementPanel {
    _listeners = []

    initialize() {
        this._initAddBtn()
    }

    addEventListener(listener) {
        this._listeners.push(listener)
    }

    _initAddBtn() {
        let addBtn = document.getElementById('measurement_addBtn')
        addBtn.addEventListener('click', e => {
            let nameInput = document.querySelector('#measurement_nameInput')
            let valueInput = document.querySelector('#measurement_valueInput')
            this._raiseNewMeasurementEvent({
                name: nameInput.value,
                value: valueInput.value
            })
        })
    }

    _raiseNewMeasurementEvent(e) {
        for (let i in this._listeners) {
            this._listeners[i].newMeasurementAdded(e)
        }
    }
}