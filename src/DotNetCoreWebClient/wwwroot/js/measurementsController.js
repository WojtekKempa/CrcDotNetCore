class MeasurementsController {
    constructor() {
        this._newMeasurementPanel = new NewMeasurementPanel();
        this._measurementListPanel = new MeasurementListPanel();

        let _this = this

        this._newMeasurementPanel.addEventListener(new class {
            newMeasurementAdded(e) {
                _this._newMeasurementPanel_newMeasurementAdded(e)
            }
        })
    }

    _newMeasurementPanel_newMeasurementAdded(e) {
        this._measurementListPanel.addNewMeasurement(e)
    }
}

(function () {
    new MeasurementsController()
})()