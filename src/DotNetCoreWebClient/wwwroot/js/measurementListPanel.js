class MeasurementListPanel {
    _listeners = []
    _counter = 0

    addNewMeasurement(measurement) {
        let grid = document.querySelector('#measurement_container')
        let newRow = grid.children[1].cloneNode(true)

        let idColumn = newRow.querySelector('div[data-column-type=\'id\']')
        let nameColumn = newRow.querySelector('div[data-column-type=\'name\']')
        let valueColumn = newRow.querySelector('div[data-column-type=\'value\']')
        let createdByColumn = newRow.querySelector('div[data-column-type=\'createdBy\']')

        newRow.dataset['rowType'] = 'data'
        newRow.dataset['internalId'] = this._counter++

        idColumn.innerText = measurement.id
        nameColumn.innerText = measurement.name
        valueColumn.innerText = measurement.value
        createdByColumn.innerText = measurement.createdBy

        let removeAnchor = newRow.querySelector('a[data-action=\'remove\']')
        removeAnchor.addEventListener('click', e => {            
            let idColumn = removeAnchor.parentElement.parentElement.querySelector("div[data-column-type=\'id\']")
            this._raiseMeasurementRemovedEvent({
                id: idColumn.innerText
            })

            removeAnchor.parentElement.parentElement.remove()
        })

        let editAnchor = newRow.querySelector('a[data-action=\'edit\']')
        editAnchor.addEventListener('click', e => {
            let row = editAnchor.parentElement.parentElement
            let nameColumn = row.querySelector('div[data-column-type=\'name\']')
            let valueColumn = row.querySelector('div[data-column-type=\'value\']')

            this._raiseMeasurementEditingEvent({
                internalId: row.dataset['internalId'],
                name: nameColumn.innerText,
                value: valueColumn.innerText
            })
        })

        newRow.classList.remove('d-none')

        grid.appendChild(newRow)
    }

    editMeasurement(measurement) {
        let grid = document.querySelector('#measurement_container')
        let row = grid.querySelector('div[data-internal-id=\'' + measurement.internalId + '\']')
        let nameColumn = row.querySelector('div[data-column-type=\'name\']')
        let valueColumn = row.querySelector('div[data-column-type=\'value\']')

        nameColumn.innerHTML = measurement.name
        valueColumn.innerHTML = measurement.value
    }

    addEventListener(listener) {
        this._listeners.push(listener);
    }

    _raiseMeasurementRemovedEvent(e) {
        this._listeners.forEach(i => {
            i.measurementRemoved(e)
        })
    }

    _raiseMeasurementEditingEvent(e) {
        this._listeners.forEach(i => {
            i.measurementEditing(e)
        })
    }
}