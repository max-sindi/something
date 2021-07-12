const {atom} = require('recoil')

const defaultState = {
  coords: null,
  fragment: null,
  highlightFragment: null,
  domElement: null
}
export const closePopup = setState => setState(defaultState)
interface ICoords {top: number, left: number}
export const popupState = atom({
  key: "popup",
  default: defaultState
})

