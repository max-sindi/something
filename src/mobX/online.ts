import {action, makeAutoObservable} from 'mobx'
import driver from './services/driver'

export default class Online {
    isOnline: boolean = false

    constructor() {
        makeAutoObservable(this)
        this.trackOnline()
    }

    trackOnline() {
        driver.online.track(
            action(res => { this.isOnline = true }),
            action(res => { this.isOnline = false })
        )
    }
}