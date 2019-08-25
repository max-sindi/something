import styled from 'styled-components'
import {generateColor} from '../../utils'

export const TagWrapper = styled.div`
  background: ${({ deepLevel, indexInLevel }) => generateColor(deepLevel, indexInLevel)}; 
  // ${({ isOpened }) => isOpened && 'border: 1px solid #234589'};
  box-shadow: 0 0 10px 0 #234589;
  // border: 1px solid #234589;
  padding: 7px;
`