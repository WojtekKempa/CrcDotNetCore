class MeasurementsController {
    _editedRowId = -1

    constructor() {
        this._newMeasurementPanel = new NewMeasurementPanel()
        this._measurementListPanel = new MeasurementListPanel()

        let _this = this

        this._newMeasurementPanel.addEventListener(new class {
            newMeasurementAdded(e) {
                _this._newMeasurementPanel_newMeasurementAdded(e)
            }

            measurementModified(e) {
                e.internalId = _this._editedRowId
                _this._measurementListPanel.editMeasurement(e)
                _this._editedRowId = -1
            }

            editingCanceled(e) {
                _this._editedRowId = -1
            }
        })

        this._measurementListPanel.addEventListener(new class {
            measurementEditing(e) {
                _this._editedRowId = e.internalId
                _this._newMeasurementPanel.editMeasurement(e)
            }

            measurementRemoved(e) {

            }
        })
    }

    _newMeasurementPanel_newMeasurementAdded(e) {
        this._measurementListPanel.addNewMeasurement(e)
    }
}

(() => new MeasurementsController())()