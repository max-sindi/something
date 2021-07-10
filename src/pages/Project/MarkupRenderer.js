import React from 'react'
import Tag from './Tag'
import _ from "lodash"
import Popup from './Popup'
import {useRecoilState} from 'recoil'
import {popupState} from './hook/popup'

const MarkupRenderer = props => {
  const [popup, setPopup] = useRecoilState(popupState)
  const template = _.get(props.currentState, 'template')
  return !template ? null : (
    <>
      <Popup />
      <Tag
        key={0}
        indexInLevel={0}
        fragment={template}
        popup={popup}
        setPopup={setPopup}
      />
    </>
  )
}

export default MarkupRenderer