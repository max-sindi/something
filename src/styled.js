
import styl from 'styled-components'


export const FullScreenStyled = styl.div`
  height: 100vh
  width: 100vw
`

export const FocusedEffects = styl.div`
  background-color: ${pr => pr.isFocused ? 'red' : 'green'}
`

export const TypeableFieldDimensions = styl(FocusedEffects)`
  padding: 10px
  height: 80vh
  width: 90vw
  box-sizing: border-box
`
