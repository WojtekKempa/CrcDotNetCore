class MeasurementService {
    _serviceUrl = ''
    _listeners = []

    constructor(serviceUrl) {
        this._serviceUrl = serviceUrl + 'api/measurement'
    }

    addEventListener(listener) {
        this._listeners.push(listener)
    }

    get() {
        let req = new XMLHttpRequest()
        req.onreadystatechange = e => {
            if (req.readyState == 4 && req.status == 200) {
                this._raiseGetResponseReady({
                    data: req.response
                })
            }
        }

        req.open('GET', this._serviceUrl)
        req.send()
    }

    _raiseGetResponseReady(e) {
        this._listeners.forEach(l => {
            l.getResponseReady(e)
        })
    }
}