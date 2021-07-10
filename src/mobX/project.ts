import {makeAutoObservable} from 'mobx'
import driver from './services/driver'

class Project {
    data = null

    constructor() {
        makeAutoObservable(this)
        this.fetchState()
    }

    fetchState = () => {
        driver.project.fetch().then(({data}) => {
            this.data = data
        })
    }

    update(data: any) {
        driver.project.update(data).then(this.fetchState)
    }

    loadAsset(asset: any) {
        driver.project.loadAsset(asset).then(this.fetchState)
    }
}

const project = new Project()
export default project