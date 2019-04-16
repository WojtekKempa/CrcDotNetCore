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
        this._listeners.forEach(l => {
            l.newMeasurementAdded(e)
        })
    }
}