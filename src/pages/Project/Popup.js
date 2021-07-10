import React from 'react'
// import popup from '../../mobX/popup'
import {observer} from 'mobx-react'
import {toJS} from 'mobx'
import {FaRegWindowClose} from 'react-icons/fa'
import EachTagManager from './EachTagManager'
import {useRecoilState} from 'recoil'
import {popupState} from './hook/popup'

const Popup = props => {
  const [popup] = useRecoilState(popupState)

  return null
  return !popup.coords ? null :
    <div
      className={`fixed rc-tooltip-inner`}
      style={toJS(popup.coords)}
    >
      sad
      {JSON.stringify(popup.coords)}
      {/*<div className={`w-300`}>*/}
      {/*  <FaRegWindowClose onClick={props.popup.closePopup} size={20}/>*/}
      {/*  <div>*/}

          {/*<EachTagManager*/}
          {/*  first={true}*/}
          {/*  fragment={props.popup.fragment}*/}
          {/*  key={0}*/}
          {/*  indexInLevel={0}*/}
          {/*  parentXpath={``}*/}
          {/*  xpath={``}*/}
          {/*  {...props}*/}
          {/*/>*/}
        {/*</div>*/}
      {/*</div>*/}
  </div>
}

// export default props => <Popup {...props} popup={popup} />
export default Popup