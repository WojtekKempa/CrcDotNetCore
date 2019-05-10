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
        let createdAtColumn = newRow.querySelector('div[data-column-type=\'createdAt\']')

        newRow.dataset['rowType'] = 'data'
        newRow.dataset['internalId'] = this._counter++

        idColumn.innerText = measurement.id
        nameColumn.innerText = measurement.name
        valueColumn.innerText = measurement.value
        createdByColumn.innerText = measurement.createdBy
        createdAtColumn.innerText = measurement.createdAt

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
            let idColumn = row.querySelector('div[data-column-type=\'id\']')
            let nameColumn = row.querySelector('div[data-column-type=\'name\']')
            let valueColumn = row.querySelector('div[data-column-type=\'value\']')

            this._raiseMeasurementEditingEvent({
                internalId: row.dataset['internalId'],
                id: idColumn.innerText,
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

    getMeasurement(internalId) {
        let grid = document.querySelector('#measurement_container')
        let row = grid.querySelector('div[data-internal-id=\'' + internalId + '\']')
        let idColumn = row.querySelector('div[data-column-type=\'id\']')
        let nameColumn = row.querySelector('div[data-column-type=\'name\']')
        let valueColumn = row.querySelector('div[data-column-type=\'value\']')
        let createdByColumn = row.querySelector('div[data-column-type=\'createdBy\']')
        let createdAtColumn = row.querySelector('div[data-column-type=\'createdAt\']')

        return {
            id: idColumn.innerHTML,
            name: nameColumn.innerHTML,
            value: valueColumn.innerHTML,
            createdBy: createdByColumn.innerHTML,
            createdAt: createdAtColumn.innerHTML
        }        
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