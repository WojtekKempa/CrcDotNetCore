class NewMeasurementPanel {
    _listeners = []

    constructor() {
        this._initButtons()
    }

    addEventListener(listener) {
        this._listeners.push(listener)
    }

    editMeasurement(measurement) {
        let nameInput = document.querySelector('#measurement_nameInput')
        let valueInput = document.querySelector('#measurement_valueInput')

        let addBtn = document.querySelector('#measurement_addBtn')
        let saveBtn = document.querySelector('#measurement_saveBtn')
        let cancelBtn = document.querySelector('#measurement_cancelBtn')

        nameInput.value = measurement.name
        valueInput.value = measurement.value

        addBtn.classList.add('d-none')
        saveBtn.classList.remove('d-none')
        cancelBtn.classList.remove('d-none')        
    }

    _initButtons() {
        let addBtn = document.getElementById('measurement_addBtn')
        addBtn.addEventListener('click', e => {
            let nameInput = document.querySelector('#measurement_nameInput')
            let valueInput = document.querySelector('#measurement_valueInput')
            this._raiseNewMeasurementEvent({
                name: nameInput.value,
                value: valueInput.value
            })

            nameInput.value = ""
            valueInput.value = ""
        })

        let saveBtn = document.querySelector('#measurement_saveBtn')
        saveBtn.addEventListener('click', e => {
            let nameInput = document.querySelector('#measurement_nameInput')
            let valueInput = document.querySelector('#measurement_valueInput')
            this._raiseMeasurementModifiedEvent({
                name: nameInput.value,
                value: valueInput.value
            })

            this._showAddBtn()
        })

        let cancelBtn = document.querySelector('#measurement_cancelBtn')
        cancelBtn.addEventListener('click', e => {
            this._showAddBtn()
            this._raiseEditingCanceledEvent({})
        })
    }

    _raiseNewMeasurementEvent(e) {
        this._listeners.forEach(l => {
            l.newMeasurementAdded(e)
        })
    }

    _raiseMeasurementModifiedEvent(e) {
        this._listeners.forEach(l => {
            l.measurementModified(e)
        })
    }

    _raiseEditingCanceledEvent(e) {
        this._listeners.forEach(l => {
            l.editingCanceled(e)
        })
    }

    _showAddBtn() {
        let nameInput = document.querySelector('#measurement_nameInput')
        let valueInput = document.querySelector('#measurement_valueInput')

        let addBtn = document.querySelector('#measurement_addBtn')
        let saveBtn = document.querySelector('#measurement_saveBtn')
        let cancelBtn = document.querySelector('#measurement_cancelBtn')

        nameInput.value = ""
        valueInput.value = ""

        addBtn.classList.remove('d-none')
        saveBtn.classList.add('d-none')
        cancelBtn.classList.add('d-none')
    }
}