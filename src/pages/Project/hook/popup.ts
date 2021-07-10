const {atom} = require('recoil')

interface ICoords {top: number, left: number}
export const popupState = atom({
  key: "popup",
  default: {
    coords: null,
    fragment: null,
    domElement: null
  }
})

