import {makeAutoObservable} from 'mobx'
import driver from './services/driver'

class Project {
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

    loadAsset(asset) {
        driver.project.loadAsset(asset).then(this.fetchState)
    }
}

const project = new Project()

export default project