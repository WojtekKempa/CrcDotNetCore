class MeasurementListPanel {

    addNewMeasurement(measurement) {
        let grid = document.querySelector("#measurement_container")
        let newRow = grid.children[1].cloneNode(true)        

        let removeAnchor = row.querySelector('a[data-action=\'remove\']')
        removeAnchor.addEventListener('click', e => {
            removeAnchor.parentElement.parentElement.remove()
        })

        newRow.classList.remove('d-none')

        grid.appendChild(newRow)
    }
}