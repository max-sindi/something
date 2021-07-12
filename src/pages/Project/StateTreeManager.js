import React from 'react'
import HtmlManager from './HtmlManager'
import AppManager from './AppManager'

const StateTreeManager = props => {
  return (
    <div style={{background: '#32D4CB'/*, padding: 20*/}}>
      <AppManager {...props} />
      <HtmlManager {...props} />
    </div>
  )
}

export default StateTreeManager