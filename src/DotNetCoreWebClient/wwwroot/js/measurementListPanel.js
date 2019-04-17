class MeasurementListPanel {
    addNewMeasurement(measurement) {
        let grid = document.querySelector('#measurement_container')
        let newRow = grid.children[1].cloneNode(true)

        let nameColumn = newRow.querySelector('div[data-column-type=\'name\']')
        let valueColumn = newRow.querySelector('div[data-column-type=\'value\']')

        nameColumn.innerText = measurement.name
        valueColumn.innerText = measurement.value

        let removeAnchor = newRow.querySelector('a[data-action=\'remove\']')
        removeAnchor.addEventListener('click', e => {
            removeAnchor.parentElement.parentElement.remove()
        })

        newRow.classList.remove('d-none')

        grid.appendChild(newRow)
    }
}