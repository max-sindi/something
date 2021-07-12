import {makeAutoObservable} from 'mobx'
import driver from './services/driver'
import _ from 'lodash'

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
        this.data = data
        driver.project.update(data).then(_.noop)
    }

    loadAsset(asset: any) {
        driver.project.loadAsset(asset).then(this.fetchState)
    }
}

const project = new Project()
export default project