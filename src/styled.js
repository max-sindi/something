
import styl from 'styled-components'


export const FullScreenStyled = styl.div`
  position: absolute;
  width: 100%;
  height: 100%
  top: 0
  left: 0
`

export const FocusedEffects = styl.div`
  background-color: red
`

export const TypeableFieldDimensions = styl(FocusedEffects)`
  height: 80vh
  width: 90vw
`
