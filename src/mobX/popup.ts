import {action, makeAutoObservable, makeObservable, observable, toJS} from 'mobx'

interface ICoords {top: number, left: number}
class Popup {
  coords: ICoords|null = null
  fragment: null|any

  constructor() {
    makeObservable(this, {
      coords: observable,
      setPopup: action
    })

    setInterval(() => {this.setPopup({top: 23, left: 32}, {})}, 2000)
  }

  setPopup(coords: ICoords, fragment: any) {
    this.coords = coords
    // this.fragment = fragment
  }

  // closePopup = () => {
  //   this.coords = null
  //   this.fragment = null
  // }

  // log = () => {
  //   console.log(toJS(this))
  // }

}

const popup = new Popup()

// setInterval(popup.log, 2000)
// export default popup