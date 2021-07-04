import axios, {AxiosInstance} from 'axios'
import _ from 'lodash'
import {makeAutoObservable, makeObservable} from 'mobx'

class HttpDriver {
    private driver: AxiosInstance

    constructor() {
        this.driver = axios.create({ baseURL: 'http://localhost:8000/api' })
    }

    getter(url) {
        return () => this.driver.get(url)
    }
    updater(url) {
        return (data) => this.driver.post(url, data)
    }
}

class Driverful {
    driver = new HttpDriver()

    // fetch = {
    //     project:
    // }

    project = {
        fetch: this.driver.getter('/z'),
        update: this.driver.updater('/z')
    }
}

const driver = new Driverful()

export default class Core {
    project = null

    constructor() {
        makeAutoObservable(this)
        this.fetchState()
    }

    fetchState = () => {
        driver.project.fetch().then(({data}) => {
            this.project = data
        })
    }

    update(data) {
        driver.project.update(data).then(this.fetchState)
    }
}