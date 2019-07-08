import styled from 'styled-components'
import colors from '../../colors'

export const SidebarOuter = styled.div`
  width: 300px;
  height: 100vh;
  padding: 50px 15px;
  border-right: 1px solid ${colors.yellow};
`
export const LinkStyled = styled.div`
  
  a {
    border-bottom: 1px solid ${colors.yellow};
    font-size: 20px;

    &.active {
      border-color: ${colors.green}
    }
    
    &:visited {
      color: inherit;
    }
  }
`

