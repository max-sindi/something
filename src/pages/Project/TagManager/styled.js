import styled from 'styled-components'
import {generateColor} from '../../../utils'
import _ from 'lodash'
import {IconContext} from 'react-icons'
import React from 'react'
import {observer} from 'mobx-react'
import popup from '../../../mobX/popup'
import {useRecoilState} from 'recoil'
import {popupState} from '../hook/popup'


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
  ${({ popup, fragment }) => {
    console.log(popup.fragment === fragment)
    return popup.fragment === fragment ? 
            `position: fixed; 
            top: ${popup.coords.top}px; 
            left: ${popup.coords.left}px
            width: 320px;
            max-height: 400px;
            overflow: auto;
            ` : 
            ''
  }}
  
  
  input, select, textarea {
    color: #cccccc; 
    border: none;
    //border-bottom: 1px solid #cccccc;
    background: ${({ deepLevel, indexInLevel, fragment, ...props }) => '#' + generateColor(deepLevel, indexInLevel).split('#').join('05')};
    min-height: 50px;
    border-radius: 5px;
    padding: 10px;
    resize: none;
  }
  //padding-bottom: 20px;
  //min-height: 200px;
`


export const TagWrapper = props => {
  const [popup] = useRecoilState(popupState)
  // console.log(popup.fragment === props.fragment)
  // console.log(popup.fragment)
  // console.log(props.fragment)
  // console.log(popup.domElement)
  return (
    <IconContext.Provider value={{className: 'pointer', color: '#cccccc', size: 17}}>
      <TagWrapperStyled {...props} popup={popup} onMouseDown={() => console.log(123123)}>

      </TagWrapperStyled>
    </IconContext.Provider>
  )
}