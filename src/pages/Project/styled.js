import styled from 'styled-components'
import {generateColor} from '../../utils'
import _ from 'lodash'
import {IconContext} from 'react-icons'
import React from 'react'

// const {} = IconContext


export const TagWrapperStyled = styled.div`
  //background: ${({ deepLevel, indexInLevel, fragment }) => '#fff'}; 
  background: ${({ deepLevel, indexInLevel, fragment }) => generateColor(deepLevel, indexInLevel)}; 
  // background: ${({ deepLevel, indexInLevel, fragment }) => _.isObject(fragment) ? generateColor(deepLevel, indexInLevel) : '#fff'}; 
  // ${({ isOpened }) => isOpened && 'border: 1px solid #234589'};
  //box-shadow: 0 0 10px 0 #234589;
  // border: 1px solid #234589;
  padding: 7px;
  padding-left: ${({deepLevel}) => `${deepLevel * 10}px`};
  border-radius: 14px;
  color: #cccccc;
  
  input, select, textarea {
    color: #cccccc; 
    border: none;
    //border-bottom: 1px solid #cccccc;
    background: ${({ deepLevel, indexInLevel, fragment }) =>'#' + generateColor(deepLevel, indexInLevel).split('#').join('05')};
    min-height: 50px;
    border-radius: 5px;
    padding: 10px;
    resize: none;
  }
  //padding-bottom: 20px;
  //min-height: 200px;
`


export const TagWrapper = props => (
  <IconContext.Provider value={{className: 'pointer', color: '#cccccc', size: 17}}>
    <TagWrapperStyled {...props}>

    </TagWrapperStyled>
  </IconContext.Provider>
)