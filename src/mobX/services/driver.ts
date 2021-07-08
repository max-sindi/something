import axios, {AxiosInstance} from "axios"
import {attempt} from 'lodash'


class HttpDriver {
    private driver: AxiosInstance

    constructor() {
        this.driver = axios.create({ baseURL: 'http://localhost:8000/api' })
    }

    get(url) {
        return () => this.driver.get(url)
    }
    update(url) {
        return (data) => this.driver.put(url, data)
    }
    post(url) {
        return (data) => this.driver.post(url, data)
    }
}


class AppHttpDriver {
    driver = new HttpDriver()

    // fetch = {
    //     project:
    // }

    project = {
        fetch: this.driver.get('/z'),
        update: this.driver.post('/z'),
        loadAsset: this.driver.post('/z/asset')
    }

    online = {
        track: (cb: (any) => void, _catch?: (any) => void) => {
            const fetchOnline = () => this.driver.get('/services/ping')().then(cb).catch(_catch)
            setTimeout(fetchOnline, 0)
            setInterval(fetchOnline, 10000)
        }
    }
}

const driver = new AppHttpDriver()

export default driver