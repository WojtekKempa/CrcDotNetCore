class MeasurementsController {
    _service = null
    _serviceUrl = ''
    _editedRowInternalId = -1
    _editedRowId = -1

    constructor(args) {
        this._serviceUrl = args.serviceUrl
        this._service = new MeasurementService('http://localhost:61646/')
        this._newMeasurementPanel = new NewMeasurementPanel()
        this._measurementListPanel = new MeasurementListPanel()

        let _this = this

        this._newMeasurementPanel.addEventListener(new class {
            newMeasurementAdded(e) {
                let data = {}
                data.name = e.name
                data.value = e.value
                data.createdBy = 'Operator'
                data.createdAt = (new Date()).toISOString()
                _this._service.post(data)                
            }

            measurementModified(e) {
                e.internalId = _this._editedRowInternalId
                _this._measurementListPanel.editMeasurement(e)
                _this._service.put(_this._editedRowId, _this._measurementListPanel.getMeasurement(_this._editedRowInternalId))
                _this._editedRowInternalId = -1
                _this._editedRowId = -1
            }

            editingCanceled(e) {
                _this._editedRowInternalId = -1
                _this._editedRowId = -1
            }
        })

        this._measurementListPanel.addEventListener(new class {
            measurementEditing(e) {
                _this._editedRowId = e.id
                _this._editedRowInternalId = e.internalId
                _this._newMeasurementPanel.editMeasurement(e)
            }

            measurementRemoved(e) {
                _this._service.delete(e.id)
            }
        })

        this._service.addEventListener(new class {
            getResponseReady(e) {
                JSON.parse(e.data).forEach(i => {
                    _this._measurementListPanel.addNewMeasurement({
                        id: i.id,
                        name: i.name,
                        value: i.value,
                        createdBy: i.createdBy,
                        createdAt: i.createdAt
                    })
                })
            }

            postResponseReady(e) {
                _this._measurementListPanel.addNewMeasurement(JSON.parse(e.data))
            }

            deleteResponseReady(e) {

            }

            putResponseReady(e) {

            }
        })

        this._service.get()
    }
}