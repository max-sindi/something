import styled from 'styled-components'
import {generateColor, transparentColor} from '../../../utils'
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
  padding: 3px;
  padding-left: ${({deepLevel}) => `${deepLevel * 4}px`};
  border-radius: 14px;
  color: #cccccc;
  ${({ popup, fragment }) => { 

    return _.get(popup, 'fragment.id', true) === _.get(fragment, 'id', false) ? 
            (() => {
              const width = 430
              const height = 700
              const {innerWidth, innerHeight} = window

              // define X point
              const shouldRenderOnLeftSide = innerWidth - popup.coords.left > width
              const xSide = shouldRenderOnLeftSide ? 'left' : 'right'
              const xPoint = xSide === 'left' ? popup.coords.left : innerWidth - popup.coords.left

              // define Y point
              // not using for now 
              const shouldRenderOnTopSide = innerHeight - popup.coords.top > height
              const ySide = shouldRenderOnTopSide ? 'top' : 'bottom'
              const yPoint = ySide === 'top' ? popup.coords.top : innerHeight - popup.coords.top

              
              return `
                position: absolute;
                top: ${popup.coords.top}px;
                ${xSide}: ${xPoint}px;
                width: ${width}px;
                overflow: auto;
                max-height: ${height}px;
              `
            })() :
            ''
  }}
  
  
  input, select, textarea {
    color: #111; 
    border: none;
    //border-bottom: 1px solid #cccccc;
    // background: ${({ deepLevel, indexInLevel, fragment, ...props }) => transparentColor(generateColor(deepLevel))};
    background: #eff;
    min-height: 20px;
    border-radius: 5px;
    padding: 4px;
    opacity: 0.95;
    //resize: none;
  }
  //padding-bottom: 20px;
  //min-height: 200px;
`


export const TagWrapper = props => {
  const {popup} = props
  // const [popup] = useRecoilState(popupState)
  // console.log(popup.fragment === props.fragment)
  // console.log(popup.fragment)
  // console.log(props.fragment)
  // console.log(popup.domElement)
  // React.useState(() => console.log('Mounted'), [])
  return (
    <div className={`position w-100-p h-100-p t-0 r-0`}>
      <IconContext.Provider value={{className: 'pointer', color: '#cccccc', size: 17}}>
        <TagWrapperStyled {...props} popup={popup} onMouseDown={() => console.log(123123)}>

        </TagWrapperStyled>
      </IconContext.Provider>
    </div>
  )
}